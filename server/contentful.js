import dotenv from 'dotenv';
dotenv.config();
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import pkg from 'contentful';
const { createClient } = pkg;

export const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.API_KEY
});

export const state = {};

export async function fetchPages() {
    state.pages = await client.getEntries({
      content_type: 'page',
    });
}

export async function fetchSlideshow(id) {
  const entry = await client.getEntry(id, { include: 10 });
  state.slideshow = entry;
  return entry;
}

export function getSlideshow(id) {
  return state.slideshow;
}

export function toSlideshowResource(slideshow) {
  if (!slideshow || !slideshow.fields) {
    return { images: [] };
  }
  
  // Extract images from slideshow fields
  const imagesField = slideshow.fields.images;
  
  const images = imagesField.map((asset) => {
    // Handle Contentful asset references (can be linked entries or direct references)
    // If it's a linked entry, resolve it from includes
    let assetData = asset;
    
    // Check if it's a sys reference (linked entry)
    if (asset.sys && asset.sys.type === 'Link') {
      // Find the asset in includes
      const includes = slideshow.includes || {};
      const assets = includes.Asset || [];
      assetData = assets.find(a => a.sys.id === asset.sys.id) || asset;
    }
    
    // Extract file URL from Contentful asset structure
    const file = assetData.fields?.file || assetData;
    const url = file.url || file.fields?.url;
    
    if (!url) {
      return null;
    }
    
    // Ensure URL has protocol
    const fullUrl = url.startsWith('//') ? `https:${url}` : url.startsWith('http') ? url : `https:${url}`;
    
    return {
      url: fullUrl,
      title: assetData.fields?.title || assetData.title || '',
    };
  }).filter((img) => img && img.url); // Filter out any invalid entries
  
  return {
    images: images,
  };
}

export function getPageBySlug(slug) {
  return state.pages?.items?.find(page => page.fields.slug === slug);
}

export function toPageResource(page) {
  return {
    title: page.fields.title,
    slug: page.fields.slug,
    html: documentToHtmlString(page.fields.text),
  }
}