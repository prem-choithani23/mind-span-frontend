export default function SubscribeEmail() {
    return (
        <div
            className="mt-[50px]
        w-full
        py-2
        px-6
        h-[230px]
        bg-[#f7f7f7] text-[#1c1c1c]
        dark:bg-[#2f3444] dark:text-white
        flex items-center justify-center
      "
        >
            <div
                className="
          max-w-7xl mx-auto
          flex flex-col gap-10
          items-center text-center
          lg:flex-row lg:items-center lg:justify-between
          lg:text-left
        "
            >
                {/* LEFT TEXT */}
                <h2 className="text-3xl md:text-4xl font-bold max-w-xl">
                    Never trust atoms; they make up everything
                </h2>

                {/* RIGHT INPUT */}
                <div
                    className="
            w-full max-w-xl
            flex items-center
            rounded-full
            p-2

            bg-white
            dark:bg-[#24293a]
          "
                >
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="
              flex-1
              px-6 py-3
              bg-transparent
              outline-none
              text-gray-700
              placeholder-gray-400

              dark:text-gray-200
              dark:placeholder-gray-400
            "
                    />

                    <button
                        className="
              flex items-center gap-2
              px-6 py-3
              rounded-full
              font-semibold

              bg-[#faedcb] text-[#1c1c1c]
              hover:bg-[#f2c3da]

              dark:bg-[#f6d6e6]
              dark:text-[#1c1c1c]
              transition
            "
                    >
                        <i className="fa-solid fa-paper-plane text-sm"></i>
                        subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
