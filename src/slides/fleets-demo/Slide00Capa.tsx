import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SLIDE_PADDING, type SlideProps } from "../config";

// Quebra a frase em palavras individualmente mascaráveis
function splitToWords(text: string, className = "") {
  const words = text.split(" ");
  return words.map((word, i) => (
    <span
      key={i}
      className="inline-block overflow-hidden"
      style={{ verticalAlign: "bottom" }}
    >
      <span className={`inline-block ${className}`} data-word>
        {word}
        {i < words.length - 1 ? " " : ""}
      </span>
    </span>
  ));
}

export default function Slide00Capa({ action: _ }: SlideProps) {
  void _;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll("[data-word]");
    const meta = el.querySelectorAll("[data-meta]");
    const subtitle = el.querySelector("[data-subtitle]");
    const nav = el.querySelector("[data-nav]");

    gsap.set([words, meta, subtitle, nav], { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(meta, { opacity: 1, duration: 0.5 }, 0.1);

    tl.fromTo(
      Array.from(words),
      { y: "110%" },
      { y: "0%", opacity: 1, duration: 0.7, stagger: 0.06 },
      0.3,
    );

    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.5 }, 0.85);
    gsap.set(subtitle, { y: 14 });

    tl.to(nav, { opacity: 1, duration: 0.4 }, 1.1);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${SLIDE_PADDING} flex-1 flex flex-col justify-between`}
    >
      <div data-meta className="h-[40px]">
        <svg
          className="h-full w-auto"
          viewBox="0 0 558 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_47_2)">
            <path
              d="M92.0547 33.3489C87.0569 28.0842 80.219 25.4814 71.5749 25.4814C66.1479 25.4814 61.4646 26.5987 57.5293 28.884C53.5642 31.144 50.5511 33.9752 48.5112 37.2932H48.082V27.1404H32.8591V97.4438H48.082V59.8586C48.082 55.7705 48.9446 52.1351 50.6658 48.9314C51.4775 47.4206 53.4367 44.0264 57.5888 41.5507C62.1616 38.8252 66.5389 38.9437 67.3846 38.9776C73.3088 39.2188 77.1846 42.4606 78.1536 43.3239C83.1174 47.7295 83.7803 53.464 83.8993 54.7632C83.9843 68.9872 84.0736 83.2113 84.1586 97.4395H99.5259V55.3938C99.5259 45.9266 97.027 38.5755 92.059 33.3404L92.0547 33.3489Z"
              fill="#7C3AED"
            />
            <path
              d="M134.736 83.9181V40.6409H155.989V27.1405H134.736V11.8416H119.368V27.1448V40.6451V80.287C119.368 89.7542 127.065 97.4481 136.601 97.4481H156.677V83.9181H134.731H134.736Z"
              fill="#7C3AED"
            />
            <path
              d="M238.852 61.9535C238.852 55.2583 237.271 49.1091 234.114 43.5058C230.956 37.8983 226.557 33.497 220.96 30.2933C215.389 27.0896 209.099 25.4899 202.117 25.4899C195.134 25.4899 188.964 27.0896 183.362 30.2933C177.791 33.497 173.367 37.9026 170.094 43.5651C166.848 49.2276 165.211 55.4911 165.211 62.3555C165.211 69.22 166.848 75.4538 170.094 81.091C173.367 86.6985 177.791 91.0998 183.362 94.3035C188.964 97.5072 195.194 99.1069 202.117 99.1069C211.509 99.1069 219.235 96.792 225.24 92.1579C231.245 87.4941 235.41 81.8316 237.734 75.166H221.823C220.212 78.1412 217.773 80.6297 214.411 82.6018C211.05 84.6036 206.945 85.6066 202.117 85.6066C198.555 85.6066 195.253 84.7475 192.181 83.0335C189.108 81.3153 186.579 78.9707 184.569 75.9955C182.559 73.0204 181.322 69.7321 180.863 66.1263H238.852V61.9493V61.9535ZM181.267 55.4022C182.015 52.4271 183.337 49.6805 185.203 47.192C187.068 44.6739 189.452 42.6721 192.385 41.2163C195.313 39.7308 198.56 38.986 202.121 38.986C205.682 38.986 209.014 39.7308 211.972 41.2163C214.9 42.6764 217.284 44.6781 219.095 47.192C220.905 49.6805 222.053 52.4271 222.512 55.4022H181.267Z"
              fill="#7C3AED"
            />
            <path
              d="M267.806 83.9181V0.00012207H252.553V88.8696C252.553 93.5884 256.404 97.4523 261.172 97.4523H283.862V83.9223H267.806V83.9181Z"
              fill="#7C3AED"
            />
            <path
              d="M294.058 27.1447V97.448H309.311V27.1447H294.058Z"
              fill="#7C3AED"
            />
            <path
              d="M378.906 72.394C377.614 76.0844 375.285 79.2288 371.927 81.7765C368.566 84.32 364.375 85.6108 359.348 85.6108C355.527 85.6108 351.996 84.6374 348.779 82.6949C345.591 80.7481 343.033 78.0057 341.167 74.4846C339.302 70.9382 338.379 66.905 338.379 62.3555C338.379 57.806 339.297 53.6332 341.167 50.1121C343.033 46.5952 345.591 43.8486 348.779 41.9018C351.996 39.9551 355.527 38.9859 359.348 38.9859C364.286 38.9859 368.366 40.1878 371.643 42.5917C374.919 45.0209 377.244 47.9706 378.621 51.5171H394.273C392.981 46.8534 390.882 42.5917 387.983 38.7024C385.11 34.8131 381.234 31.639 376.381 29.176C371.558 26.7171 365.867 25.4856 359.348 25.4856C352.829 25.4856 346.335 27.1149 340.764 30.3483C335.162 33.607 330.768 38.0422 327.551 43.6497C324.334 49.2572 322.727 55.4911 322.727 62.3555C322.727 69.2199 324.334 75.4538 327.551 81.0063C330.768 86.5842 335.162 90.9898 340.764 94.2485C346.335 97.4818 352.54 99.1111 359.348 99.1111C366.156 99.1111 371.842 97.8542 376.755 95.3657C381.638 92.8476 385.544 89.5889 388.476 85.5261C391.434 81.493 393.444 77.117 394.566 72.3982H378.914L378.906 72.394Z"
              fill="#7C3AED"
            />
            <path
              d="M407.281 27.1447V97.448H422.504V27.1447H407.281Z"
              fill="#7C3AED"
            />
            <path
              d="M458.581 83.9181V40.6409H479.809V27.1405H458.581V11.8416H443.188V27.1448V40.6451V88.8697C443.188 93.5884 447.064 97.4523 451.807 97.4523H480.527V83.9224H458.581V83.9181Z"
              fill="#7C3AED"
            />
            <path
              d="M542.16 27.1447L525.242 83.9223H517.256L502.607 27.1447H486.522L503.67 91.0703C504.677 94.8156 508.094 97.448 511.999 97.448H521.192L513.062 123.877H529.147L558.072 27.1447H542.16Z"
              fill="#7C3AED"
            />
            <path
              d="M15.2528 27.1447H0.000244141V97.448H15.2528V27.1447Z"
              fill="#7C3AED"
            />
            <path
              d="M15.2528 6.20862H0.000244141V21.3679H15.2528V6.20862Z"
              fill="#7C3AED"
            />
            <path
              d="M309.311 6.19165H294.058V21.3806H309.311V6.19165Z"
              fill="#7C3AED"
            />
            <path
              d="M422.521 6.19165H407.269V21.3806H422.521V6.19165Z"
              fill="#7C3AED"
            />
          </g>
          <defs>
            <clipPath id="clip0_47_2">
              <rect width="558" height="124" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div>
        {/* Wordmark em Exo 2 — a tipografia da marca, não a do corpo do deck. */}
        <h1
          className="text-[150px] font-bold leading-[0.88] tracking-[-0.04em] text-purple"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {splitToWords("Fleets")}
        </h1>
        <p
          data-subtitle
          className="mt-9 text-[30px] text-text/55 leading-[1.4] tracking-[-0.02em] max-w-[1000px]"
        >
          Hardware, frota, pagamento.{" "}
          <span className="text-text/80 font-semibold">No mesmo lugar.</span>
        </p>
      </div>

      <div
        data-nav
        className="font-mono text tracking-[0.18em] text-purple/80 uppercase flex items-center justify-between gap-3 w-full"
      >
        <span>Agosto 2026 · Gabriel Godoy · Tiago Bega</span>
      </div>
    </div>
  );
}
