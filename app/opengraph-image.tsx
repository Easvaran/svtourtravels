import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SV Tour and Travels - Taxi Service in Puducherry';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0870b8 0%, #00bcd4 100%)',
          color: 'white',
          fontSize: 64,
          fontWeight: 700,
          padding: 40,
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 24, letterSpacing: 4, opacity: 0.9 }}>SV TOUR AND TRAVELS</div>
        <div>Puducherry Taxi & Tour Services</div>
      </div>
    ),
    { ...size }
  );
}
