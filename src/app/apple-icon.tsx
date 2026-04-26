import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '42px',
          backgroundColor: '#0d0d0d',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          <span
            style={{
              fontSize: '110px',
              fontFamily: 'serif',
              fontWeight: 600,
              color: '#f5f0e8',
              lineHeight: 1,
            }}
          >
            B
          </span>
          <span
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#c9a84c',
              marginBottom: '16px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
