import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ImageResponse } from "next/server";

dayjs.extend(utc);

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const from = searchParams.has("date")
    ? dayjs.utc(searchParams.get("date")!)
    : dayjs.utc();
  const to = from.add(1, "day");

  const fontData = await fetch(
    new URL("../../../assets/Lexend-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const bookData = await fetch(
    "https://pb.tana.moe/api/collections/0l473ttmx8o31i9/records?" +
      new URLSearchParams({
        page: "1",
        perPage: "30",
        sort: "+name",
        filter: `publishDate>='${from.format(
          "YYYY-MM-DD"
        )}'&&publishDate<'${to.format(
          "YYYY-MM-DD"
        )}'&&(baseCover:length > 0||cover:length > 0)&&edition=''`,
      })
  ).then((res) => res.json());

  if (bookData.items.length === 0)
    return new Response(`No releases to generate image`, {
      status: 500,
    });

  if (bookData.items.length > 15) bookData.items = bookData.items.splice(0, 15);

  const books = [];
  bookData.items.forEach((book, i) => {
    if (i % 5 === 0) books.push([book]);
    else books[Math.floor(i / 5)].push(book);
  });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 48px",
        }}
        tw="bg-zinc-900 text-zinc-200"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
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
            style={{ fontSize: "72px", fontFamily: "Lexend", fontWeight: 700 }}
          >
            Phát hành hôm nay
          </h1>
        </div>
        {books.map((bookRow, i) => (
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              // justifyContent: "center",
              width: "100%",
            }}
            key={i}
          >
            {bookRow.map((book) => {
              if (book.cover || book.baseCover) {
                let cover: string;
                if (book.cover.length > 0) cover = book.cover[0];
                else if (book.baseCover.length > 0) cover = book.baseCover[0];

                return (
                  <div
                    style={{
                      backgroundImage: `url('https://pb.tana.moe/api/files/${book.collectionId}/${book.id}/${cover}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "200px 300px",
                      objectFit: "cover",
                      width: "200px",
                      height: "300px",
                      borderRadius: "8px",
                    }}
                  />
                );
              }
            })}
          </div>
        ))}
      </div>
    ),
    {
      width: 1200,
      height: 1200,
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
