import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { AiFillThunderbolt } from "react-icons/ai";

export default function ApplyJobDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" className="mt-2">
          <AiFillThunderbolt className="mt-[3px]" /> <p>Quick Apply</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
          <h1>Hwllo</h1>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
