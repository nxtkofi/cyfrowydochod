import { Switch } from "../../switch";

function ThemeSwitch() {
  return (
    <div className="mt-8 rounded-md bg-[#FBFBFB] flex flex-col p-4 self-center shadow-lg">
      <p className="font-medium text-center mb-2">Current theme</p>
      <div className="flex flex-row">
        <p className="mx-4 font-medium">Light</p>
        <Switch />
        <p className="mx-4 font-medium">Dark</p>
      </div>
    </div>
  );
}

export default ThemeSwitch;
