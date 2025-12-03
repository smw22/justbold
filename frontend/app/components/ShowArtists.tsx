import { useState } from "react";
import type { ProfileType } from "~/types/profile";
import { Link } from "react-router";

export default function ShowArtists({ users, theme, onShowMore }: { users: string[]; theme: string; onShowMore: () => void }) {
  return (
    <div className="p-4 flex items-center gap-2">
      {users.length > 0 ? (
        // there are users. Awesome! That means we need to show them.
        // show 4 circles with images
        users.length < 5 ? (
          // show all the users because there are so few.
          <>
            <div className="flex relative">
              {users.map((user, index) => (
                <div
                  key={index + 1}
                  className={`relative w-20 h-20 bg-${theme} border-4 border-white opacity-100 rounded-full shadow ${index === 0 ? "" : "-ml-8"}`}
                ></div>
              ))}
            </div>
          </>
        ) : (
          // show the first three users + a circle with the number of remaining users, because there are so many.
          <>
            <div className="flex relative">
              {users.slice(0, 3).map((user, index) => (
                <div
                  key={index + 1}
                  className={`relative w-20 h-20 bg-${theme} border-4 border-white opacity-100 rounded-full shadow-lg ${index === 0 ? "" : "-ml-8"}`}
                ></div>
              ))}
              <div
                className={`flex justify-center items-center relative w-20 h-20 bg-${theme} border-4 border-white opacity-100 rounded-full shadow-lg -ml-8`}
              >
                <p className="text-white">+{users.length - 3}</p>
              </div>
            </div>
            <button
              className="hover:opacity-40 cursor-pointer text-neutral-grey text-sm transition-opacity duration-200 ease-in-out"
              onClick={onShowMore}
            >
              See more
            </button>
          </>
        )
      ) : (
        // There aren't any users. Dang it. We show a short message instead.
        <p>Didn't find any. 😔</p>
      )}
    </div>
  );
}
