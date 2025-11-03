/** @format */

import type { Metadata } from "next";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, SITE_URL } from "@/constant";

interface SEOMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

/**
 * App Router용 SEO 메타데이터 생성 유틸리티
 * generateMetadata 함수에서 사용할 수 있습니다.
 */
export const generateSEOMetadata = ({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  canonicalUrl,
  noIndex = false,
}: SEOMetadataProps = {}): Metadata => {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  // SITE_URL은 이미 상수에서 import

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: keywords.length > 0 ? keywords : ["Next.js", "React", "TypeScript"],
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonicalUrl || SITE_URL,
      siteName: DEFAULT_TITLE,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
};

/**
 * 페이지별 SEO 설정을 위한 헬퍼 함수
 * 각 페이지의 generateMetadata에서 사용
 */
export const createPageMetadata = (props: SEOMetadataProps): Metadata => {
  return generateSEOMetadata(props);
};

// 기본 export는 제거하고 named export만 사용
export type { SEOMetadataProps };
