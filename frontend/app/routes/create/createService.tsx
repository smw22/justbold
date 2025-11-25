import AvatarHeader from "../services/components/AvatarHeader";
import CreateServiceForm from "./components/CreateServiceForm";

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
}

export default function CreateService() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AvatarHeader imageSize={40} title="EchoLabs Studio" />
      <CreateServiceForm />
    </div>
  );
}
