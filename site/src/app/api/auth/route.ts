import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  // Step 1: Redirect to GitHub for authorization
  if (!code) {
    if (!CLIENT_ID) {
      return NextResponse.json({ error: 'GitHub OAuth not configured' }, { status: 500 })
    }

    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
    githubAuthUrl.searchParams.set('client_id', CLIENT_ID)
    githubAuthUrl.searchParams.set('scope', 'repo,user')
    githubAuthUrl.searchParams.set('redirect_uri', `${request.nextUrl.origin}/api/auth`)

    return NextResponse.redirect(githubAuthUrl.toString())
  }

  // Step 2: Handle callback from GitHub
  if (!CLIENT_SECRET) {
    return NextResponse.json({ error: 'GitHub OAuth not configured' }, { status: 500 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    })

    const data = await tokenResponse.json()

    if (data.error) {
      return NextResponse.json({ error: data.error_description || data.error }, { status: 400 })
    }

    // Return token to CMS via postMessage
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Authenticating...</title>
      </head>
      <body>
        <script>
          (function() {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(data)}',
              window.location.origin
            );
            window.close();
          })();
        </script>
      </body>
    </html>
    `

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 })
  }
}
