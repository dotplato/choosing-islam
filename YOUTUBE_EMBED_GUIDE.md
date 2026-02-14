# YouTube Video Embed Implementation Guide

## Overview

This guide explains how to add YouTube videos to your articles using Contentful CMS with embedded entries.

---

## Part 1: Contentful CMS Setup

### Step 1: Create Video Embed Content Type

1. **Log in to Contentful** (https://app.contentful.com)
2. Navigate to your space
3. Click **"Content model"** in the top navigation bar
4. Click the **"Add content type"** button (top right)
5. Fill in the form:
   - **Name**: `Video Embed`
   - **Api Identifier**: `videoEmbed` (auto-generated)
   - **Description**: `YouTube video embeds for articles`
6. Click **"Create"**

### Step 2: Add Fields to Video Embed Content Type

#### Field 1: Title

1. Click **"Add field"** button
2. Select **"Text"** → **"Short text"**
3. Configure:
   - **Name**: `Title`
   - **Field ID**: `title`
4. In the **"Settings"** tab:
   - Check ✅ **"This field represents the Entry title"**
   - Check ✅ **"Required field"**
5. Click **"Create and configure"**
6. Click **"Save"**

#### Field 2: YouTube URL

1. Click **"Add field"** button
2. Select **"Text"** → **"Short text"**
3. Configure:
   - **Name**: `YouTube URL`
   - **Field ID**: `youtubeUrl`
4. In the **"Settings"** tab:
   - Check ✅ **"Required field"**
5. (Optional) In the **"Validation"** tab:
   - Click **"Add validation"**
   - Select **"Match a specific pattern"**
   - Pattern: `^(https?://)?(www\.)?(youtube\.com|youtu\.be)/.+$`
   - Custom error message: `Please enter a valid YouTube URL`
6. Click **"Create and configure"**
7. Click **"Save"**

#### Field 3: Description (Optional)

1. Click **"Add field"** button
2. Select **"Text"** → **"Long text"**
3. Configure:
   - **Name**: `Description`
   - **Field ID**: `description`
4. Click **"Create and configure"**
5. Click **"Save"**

6. **Save the content type** by clicking **"Save"** in the top right corner

### Step 3: Enable Video Embeds in Article Content Type

1. Go back to **"Content model"**
2. Find and click on your **"Article"** content type
3. Find your **Rich Text field** (likely called `Body Content` or similar)
4. Click on the field name to edit it
5. Go to the **"Validation"** tab
6. Scroll down to find **"Embedded entry types"** or **"Accept only specified entry type"**
7. Check the box next to **"Video Embed"**
8. Click **"Confirm"**
9. Click **"Save"** at the top right of the page

### Step 4: Create Your First Video Entry

1. Go to **"Content"** in the top navigation
2. Click **"Add entry"** dropdown
3. Select **"Video Embed"**
4. Fill in the fields:
   - **Title**: e.g., "Introduction to Islam"
   - **YouTube URL**: Paste any YouTube URL format:
     - `https://www.youtube.com/watch?v=VIDEO_ID`
     - `https://youtu.be/VIDEO_ID`
     - `https://www.youtube.com/embed/VIDEO_ID`
   - **Description**: (Optional) Add context about the video
5. Click **"Publish"** (top right)

### Step 5: Add Video to an Article

1. Go to **"Content"** and open an existing article (or create a new one)
2. Scroll to the **Rich Text editor** (Body Content field)
3. Click where you want to insert the video
4. Click the **"+"** button or **"Embed"** icon in the toolbar
5. Select **"Embedded entry - Block"** (recommended) or **"Inline"**
6. Choose **"Existing entry"**
7. Search for your video entry by title
8. Select it and click **"Insert"**
9. You should see a placeholder for the video in the editor
10. Click **"Publish"** or **"Save"** to update the article

---

## Part 2: Testing Your Implementation

### Test the Video Display

1. Make sure your dev server is running:

   ```bash
   npm run dev
   ```

2. Navigate to the article you just edited:
   - Go to `http://localhost:3000/articles/[your-article-slug]`

3. You should see:
   - ✅ A responsive YouTube video player embedded in the article
   - ✅ The video title (if provided)
   - ✅ The video description (if provided)
   - ✅ A loading spinner while the video loads
   - ✅ The video maintains 16:9 aspect ratio on all screen sizes

### Supported YouTube URL Formats

The implementation supports all common YouTube URL formats:

- `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ`
- `https://www.youtube.com/embed/dQw4w9WgXcQ`
- `dQw4w9WgXcQ` (just the video ID)

---

## Part 3: Code Implementation Details

### Files Modified/Created:

1. **`types/contentful.d.ts`**
   - Added `ContentfulVideoEmbed` interface

2. **`components/YouTubeEmbed.tsx`** (NEW)
   - Reusable YouTube embed component
   - Extracts video ID from various URL formats
   - Responsive 16:9 aspect ratio
   - Loading state with spinner
   - Error handling for invalid URLs

3. **`app/articles/[slug]/page.tsx`**
   - Added `BLOCKS.EMBEDDED_ENTRY` renderer
   - Detects `videoEmbed` content type
   - Renders YouTubeEmbed component

4. **`lib/contentful.ts`**
   - Increased `include` depth to 3 for `getArticleBySlug`
   - Ensures embedded entries are fully fetched

---

## Troubleshooting

### Video Not Showing?

1. **Check Contentful:**
   - Is the video entry published?
   - Is the article with the embedded video published?
   - Did you enable "Video Embed" in the Article's rich text validation?

2. **Check Console:**
   - Open browser DevTools (F12)
   - Look for any errors in the Console tab

3. **Check URL:**
   - Make sure the YouTube URL is valid
   - Try copying the URL directly from YouTube's address bar

### Video Shows "Invalid YouTube URL"?

- The URL format might not be recognized
- Try using the standard format: `https://www.youtube.com/watch?v=VIDEO_ID`
- Make sure there are no extra spaces or characters

### Video Not Responsive?

- The component uses Tailwind CSS classes
- Make sure your Tailwind configuration is working properly

---

## Adding Multiple Videos

You can add as many videos as you want to a single article:

1. In the rich text editor, position your cursor where you want each video
2. Click the embed button and select your video entry
3. Repeat for each video
4. You can mix videos with text, images, headings, etc.

---

## Best Practices

1. **Video Titles**: Use descriptive titles that help readers understand the content
2. **Descriptions**: Add context about why this video is relevant to the article
3. **Placement**: Place videos where they naturally fit in the content flow
4. **Reusability**: Create video entries once and reuse them across multiple articles
5. **Organization**: Consider creating a naming convention for video entries (e.g., "Video: Topic Name")

---

## Next Steps

- Create more video entries for your content library
- Consider adding playlists or video series
- Add custom styling to match your brand
- Consider adding video thumbnails or custom preview images

---

**Implementation Complete! ✅**

Your articles can now include beautiful, responsive YouTube video embeds managed through Contentful CMS.
