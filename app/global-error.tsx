"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            display: "grid",
            minHeight: "100vh",
            placeItems: "center",
            background: "#f8fafc",
            color: "#3f4657",
            padding: "24px",
            textAlign: "center",
            fontFamily: "Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          }}
        >
          <div>
            <h1 style={{ margin: 0, color: "#2e5a75", fontSize: "30px", fontWeight: 900 }}>
              Something went wrong
            </h1>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>The portal could not render this view.</p>
            <button
              type="button"
              onClick={reset}
              style={{
                alignItems: "center",
                background: "#2e5a75",
                border: 0,
                borderRadius: "6px",
                color: "#ffffff",
                cursor: "pointer",
                display: "inline-flex",
                fontSize: "14px",
                fontWeight: 700,
                justifyContent: "center",
                marginTop: "20px",
                padding: "10px 16px"
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
