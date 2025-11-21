import { useState } from "react";
import Switch from "~/components/Switch";

export default function Home() {
  const [value, setValue] = useState(false);

  return (
    <>
      <h1>Home Page</h1>
      <Switch value={value} onClick={() => setValue(!value)} />
    </>
  );
}
