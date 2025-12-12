import { useState } from "react";
import { Link } from "react-router";
import ContextMenu from "~/components/ContextMenu";
import Button from "~/components/Button";
import Icon from "~/components/icon";

export default function ProfileHeaderRedacted({}) {
  return (
    <article className={`p-5 rounded-4xl mb-12 mt-4 bg-header-bg-1 text-white flex flex-col justify-center gap-3 items-center`}>
      <div className="w-full relative flex items-end justify-end -mb-8">
        <div className="size-8 bg-neutral-100/20 rounded-full"></div>
      </div>
      <section className="flex justify-center gap-1 items-center">
        <div className="flex flex-col items-center w-24 gap-1">
          <div className="h-6 w-2/12 bg-neutral-100/20 rounded-lg animate-pulse"></div>
          <div className="h-4 w-10/12 bg-neutral-100/20 rounded-lg animate-pulse"></div>
        </div>

        <img src={""} className="w-36 h-36 rounded-full object-cover bg-gray-400  border-2 border-white" />
        <div className="flex flex-col items-center w-24 gap-1">
          <div className="h-6 w-2/12 bg-neutral-100/20 rounded-lg animate-pulse"></div>
          <div className="h-4 w-8/12 bg-neutral-100/20 rounded-lg animate-pulse"></div>
        </div>
      </section>
      <section className="flex flex-col items-center gap-2 flex-1 w-full">
        <div className="flex items-center gap-1 flex-1 w-full justify-center">
          <div className="h-6 w-3/12 bg-neutral-100/20 rounded-lg animate-pulse"></div>
          <Icon name="TwitterVerifiedBadge" size={20} />
        </div>
        <div className="h-4 w-6/12 bg-neutral-100/20 rounded-lg animate-pulse"></div>
      </section>
      <section className="flex flex-row gap-4 w-full mt-1">
        <div className="h-9 w-12/12 bg-neutral-100/20 rounded-full animate-pulse"></div>
        <div className="h-9 w-12/12 bg-neutral-100/20 rounded-full animate-pulse"></div>
      </section>
    </article>
  );
}
