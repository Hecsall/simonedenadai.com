
/**
 * Generate BlogPost OG image from Cloudinary
 * The template image is 1200 x 630px
 * @param {String} title - Blog Post title
 * @param {String} imagePublicId - Blog Post cover image (publicId from Cloudinary)
 * @returns 
 */
export default function generateSocialImage({title, imagePublicId}) {
  // Cloudinary cloud name
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  // Title of the Blog Post urlencoded
  // Commas are replaced with a greek comma since Cloudinary can't handle them
  const cleanedTitle = title?.replace(',', '‚')
  title = encodeURIComponent(cleanedTitle);

  return `https://res.cloudinary.com/${cloudName}/image/upload/$title_!${title}!/t_${process.env.NEXT_PUBLIC_CLOUDINARY_OG_IMAGE_TRANSFORMATION_NAME}/${imagePublicId}`
}