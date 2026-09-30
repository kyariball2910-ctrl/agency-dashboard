import { KeyVault } from "@/components/keys/KeyVault";

export default function KeysPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">API Keys</h1>
        <p className="text-muted-foreground">
          Add your own keys. Everything runs against your accounts.
        </p>
      </div>
      <KeyVault />
    </div>
  );
}
