# GitHub Pages Deployment

This project is a static site. It can be deployed from the `main` branch root on GitHub Pages.

## Recommended repository

For the simplest live URL, create a public repository named:

```text
jeetkumarsahu.github.io
```

GitHub user sites use this format:

```text
<username>.github.io
```

For this account, the lowercase username appears to be:

```text
jeetkumarsahu
```

## Upload steps

1. Create a public GitHub repository named `jeetkumarsahu.github.io`.
2. Upload all project files from this folder except the `.git` folder.
3. Go to repository `Settings`.
4. Open `Pages`.
5. Set source to `Deploy from a branch`.
6. Select branch `main` and folder `/root`.
7. Save.

After publishing, the default URL should be:

```text
https://jeetkumarsahu.github.io
```

GitHub says Pages changes can take up to 10 minutes to publish.

## Custom domain

The root-level `CNAME` file currently points to:

```text
jugad.qzz.io
```

If the domain changes later, update `CNAME` with only the new domain text.

Custom domain examples:

Example for apex domain:

```text
example.com
```

Example for subdomain:

```text
www.example.com
```

## DNS records

For an apex domain like `example.com`, set these `A` records at your DNS provider:

```text
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153
```

Optional IPv6 `AAAA` records:

```text
@  AAAA  2606:50c0:8000::153
@  AAAA  2606:50c0:8001::153
@  AAAA  2606:50c0:8002::153
@  AAAA  2606:50c0:8003::153
```

For a subdomain like `www.example.com`, set a `CNAME` record:

```text
www  CNAME  jeetkumarsahu.github.io
```

Avoid wildcard DNS records such as `*.example.com`.

## HTTPS

After DNS finishes propagating, return to GitHub repository `Settings > Pages` and enable `Enforce HTTPS`.
