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

    console.log('GitHub OAuth Response:', data)

    if (data.error) {
      console.error('GitHub OAuth Error:', data.error, data.error_description)
      return NextResponse.json({ error: data.error_description || data.error }, { status: 400 })
    }

    if (!data.access_token) {
      console.error('No access token in response:', data)
      return NextResponse.json({ error: 'No access token received' }, { status: 400 })
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
          console.log('OAuth callback received');
          console.log('Access token:', ${JSON.stringify(data.access_token)});

          (function() {
            const token = ${JSON.stringify(data.access_token)};
            const provider = "github";

            console.log('Sending postMessage with token:', token);

            // Post message to opener window (CMS)
            if (window.opener) {
              const message = "authorization:github:success:" + JSON.stringify({
                token: token,
                provider: provider
              });
              console.log('PostMessage:', message);
              window.opener.postMessage(message, window.location.origin);
              console.log('PostMessage sent successfully');
            } else {
              console.error('No window.opener found!');
            }

            // Close popup after a short delay
            setTimeout(function() {
              console.log('Closing window...');
              window.close();
            }, 1000);
          })();
        </script>
        <p>Authentication successful! Check console for debug info...</p>
        <p>This window should close automatically in 1 second.</p>
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
