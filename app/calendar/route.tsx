import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const fontData = await fetch(
    new URL("../../assets/Lexend-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        tw="bg-zinc-900 text-zinc-200"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 526.49 549.49"
            height={64}
          >
            <g>
              <path d="m151.64,507.75v-129.49l-66.45,3.41L0,339.07v-138.01l151.64-11.08V11.93L285.4,0l85.19,42.6v127.79l70.71-4.26,85.19,42.6v138.01l-155.9,11.93v178.9l-133.75,11.93-85.19-41.75Zm281.14-211.28v-120.97l-155.9,11.93V9.37l-116.71,10.22v178.05l-151.64,11.08v120.97l151.64-11.07v179.76l116.71-10.22v-179.76l155.9-11.93Z" />
              <polygon
                fill="#89c4f4"
                points="432.78 296.47 432.78 175.5 276.88 187.42 276.88 9.37 160.16 19.59 160.16 197.65 8.52 208.72 8.52 329.69 160.16 318.62 160.16 498.38 276.88 488.15 276.88 308.4 432.78 296.47"
              />
            </g>
          </svg>
          <h1
            style={{ fontSize: "64px", fontFamily: "Lexend", fontWeight: 700 }}
          >
            Lịch phát hành
          </h1>
        </div>

        <img
          src="https://tana.moe/register_banner.png"
          style={{ width: "80%" }}
          tw="-mb-72"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Lexend",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
