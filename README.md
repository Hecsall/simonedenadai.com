
# Personal Website

My personal website, made with Next.js

## **Setup**

This project uses **Node 18**

Install dependencies with

```sh
npm install
```

Run local dev server ([http://localhost:3000](http://localhost:3000)) with

```sh
npm run dev
```

## **Environment**

The `.env.local` file in the project root is used to store sensitive information.\
Values must be added to Vercel Environment Variables too.

## **Cloudinary setup**
To render og images for blog posts, there is a function that uses a cloudinary [named transformation](https://cloudinary.com/documentation/image_transformations#named_transformations).

The `cloudinary-create-transformation.js` script found in the project root creates the transformation on your cloudinary account using the Cloudinary credentials that you put in your `.env.local` file.\

- In the .env.local, 4 variables need to be set

    ```sh
    # Cloudinary Cloud name
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="mycloudname"

    # Found in the Cloudinary Dashboard
    CLOUDINARY_URL="cloudinary://<API_KEY>:<API_SECRET>@<cloudname>"

    # Arbitrary name used for the transformation
    NEXT_PUBLIC_CLOUDINARY_OG_IMAGE_TRANSFORMATION_NAME="mywebsite-blog-og-image"

    # Image used as overlay, with a transparent area to show the Blog Post Cover Image (see https://res.cloudinary.com/hecsa/image/upload/v1677234643/simonedenadai.com/og-image-template.png)
    # Note: subfolder paths use semi-colons (:) instead of slashes (/)
    CLOUDINARY_OG_IMAGE_OVERLAY_PUBLIC_ID="somefolder:some-image"
    ```

- Run the script that creates the transformation on Cloudinary

    ```sh
    node cloudinary-create-transformation.js
    ```

This transformation contains a variable that allows to print the post title on the image itself, see the example image below:

This:\
`https://res.cloudinary.com/hecsa/image/upload/$title_!Title%20Placeholder!/t_simonedenadaicom-blog-og-image/simonedenadai.com/og-sample`

Renders this:\
![OG Image](https://res.cloudinary.com/hecsa/image/upload/$title_!Title%20Placeholder!/t_simonedenadaicom-blog-og-image/simonedenadai.com/og-sample)

## **Sanity (CMS)**

To handle content on the website, such as Blog posts and Projects, I'm using [Sanity.io](https://www.sanity.io/).\
All it's related Environment variables need to be set in the `.env.local` for it to work.
