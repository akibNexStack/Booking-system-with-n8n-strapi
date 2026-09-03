# Slack booking approval setup

The workflow in `strapi-booking-created.json` sends each new booking to Slack,
waits for a channel member to select **Confirm booking** or **Cancel booking**,
then updates the same Strapi booking to `confirmed` or `cancelled`.

## 1. Give n8n a public HTTPS URL

Slack cannot call an n8n instance that is available only at `localhost`.
Expose port 5678 through an HTTPS reverse proxy or tunnel. Copy the public URL
into `n8n/.env` (the complete template is in `n8n/.env.example`):

```dotenv
N8N_PUBLIC_URL=https://your-public-n8n-host.example/
N8N_HOST=your-public-n8n-host.example
N8N_PROTOCOL=https
N8N_SECURE_COOKIE=true
```

Keep the trailing slash on `N8N_PUBLIC_URL`, then recreate the n8n container so
the generated approval callbacks use that public address.

## 2. Import the Slack app

Before importing the Slack app manifest, replace every `n8n.example.com` in
`slack-app-manifest.json` with the real hostname from `N8N_HOST`. Both URLs must
use the same public HTTPS hostname:

```text
OAuth callback: https://YOUR_N8N_HOST/rest/oauth2-credential/callback
Request URL:    https://YOUR_N8N_HOST/webhook-waiting-slack
```

Then, in the Slack app dashboard:

1. Select **Create New App** > **From an app manifest**.
2. Choose the workspace, select the **JSON** tab, and paste the contents of
   `slack-app-manifest.json`.
3. Create the app and install it to the workspace.
4. Add the app to the public or private Slack channel that will receive booking
   approvals.

## 3. Create the n8n credentials

Slack generates the private credential values after the app is created. In
Slack, open **Settings** > **Basic Information** > **App Credentials** and copy:

- Client ID
- Client Secret
- Signing Secret

In n8n, create a **Slack OAuth2 API** credential named
`Slack OAuth2 - Salon Booking` and enter those three values. Confirm that the
OAuth Callback URL displayed by n8n exactly matches the redirect URL in the
Slack manifest. Turn on **Custom Scopes** and set **User Scope** to:

```text
channels:read chat:write groups:read users:read users:read.email
```

Select **Connect my account**, authorize the Slack workspace, and save the
credential. Client secrets and OAuth tokens are deliberately not stored in the
workflow JSON; n8n encrypts them in its credential store.

Create an n8n **Header Auth** credential for Strapi:

- Name: `Authorization`
- Value: `Bearer <your Strapi API token>`

The Strapi API token needs permission to update bookings. When using n8n Cloud,
Strapi must also have a public HTTPS address. Configure the HTTP Request node as:

```text
PUT https://YOUR_PUBLIC_STRAPI_DOMAIN/api/bookings/{documentId}
```

Set the Header Auth credential's **Allowed HTTP Request Domains** to only the
Strapi origin, for example `https://api.example.com`. Do not include `/api` or
the booking path in that credential field.

For a self-hosted n8n Docker container with Strapi running on the same host,
`http://host.docker.internal:1337/api` can be used instead. The included Docker
Compose file maps that hostname to the host machine.

## 4. Import and configure the workflow

Import `strapi-booking-created.json` into n8n, then replace the remaining
placeholder values:

- Slack channel ID
- Slack OAuth2 credential named `Slack OAuth2 - Salon Booking`
- Strapi Header Auth credential
- Google Sheet ID and Google Sheets credential, if the Sheets branch is used

Activate the workflow. In Strapi, configure an `entry.create` webhook for the
Booking content type pointing to n8n's production webhook URL:

```text
https://your-public-n8n-host.example/webhook/strapi-booking-created
```

## Expected result

After a booking is created, Slack shows both decision buttons. The first valid
click resumes the waiting n8n execution, removes the buttons, records the
responder in Slack, and sends this Strapi payload:

```json
{
  "data": {
    "status": "confirmed"
  }
}
```

Selecting **Cancel booking** sends the same payload with `cancelled`.
