import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: '이미지가 필요합니다.' }, { status: 400 });
    }

    // base64 데이터 URL 형식으로 변환
    const dataUrl = `data:${mimeType || 'image/jpeg'};base64,${imageBase64}`;

    // Cloudinary에 업로드
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'recipe-app',
      resource_type: 'image',
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: '이미지 업로드 실패' },
      { status: 500 }
    );
  }
}
