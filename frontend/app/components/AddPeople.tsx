import { useState, useEffect, type ChangeEvent } from "react";
import { useOutletContext } from "react-router";
import AvatarHeader from "./AvatarHeader";
import Button from "./Button";
import Input from "./Input";
import { apiFetch } from "~/lib/apiFetch";

interface Connection {
  id: string;
  requester: {
    id: string;
    name: string;
    profile_image: string;
  };
  addressee: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export default function AddPeople() {
  const { user } = useOutletContext<{
    user: { id: string; profile_image: string; name: string };
  }>();
  const [showSearch, setShowSearch] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await apiFetch("/connections");
        if (response.ok) {
          const data = await response.json();
          setConnections(data.accepted || []);
        }
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const [query, setQuery] = useState("");
  const [selectedConnections, setSelectedConnections] = useState<Connection[]>([]);

  const filteredConnections = query.trim()
    ? connections.filter((connection) => {
        const connectedUser = connection.requester.id === user.id ? connection.addressee : connection.requester;
        const isAlreadySelected = selectedConnections.some((selected) => selected.id === connection.id);
        return connectedUser.name.toLowerCase().includes(query.toLowerCase()) && !isAlreadySelected;
      })
    : connections.filter((connection) => !selectedConnections.some((selected) => selected.id === connection.id));

  const handleAddConnection = (connection: Connection) => {
    setSelectedConnections((prev) => [...prev, connection]);
  };

  const handleRemoveConnection = (connectionId: string) => {
    setSelectedConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <AvatarHeader
          imageUrl={user.profile_image}
          imageSize={40}
          title={user.name}
          color=""
          className="text-(--darkgrey-text)"
        />
        {showSearch ? (
          <button onClick={() => setShowSearch(false)} className="text-sm cursor-pointer">
            Close
          </button>
        ) : (
          <Button text="Add people" variant="primary" icon="Plus" onClick={() => setShowSearch(true)} />
        )}
      </div>

      {/* Display selected connections */}
      {selectedConnections.length > 0 && (
        <div className="flex flex-col gap-2">
          {selectedConnections.map((connection) => {
            const connectedUser = connection.requester.id === user.id ? connection.addressee : connection.requester;
            return (
              <div key={connection.id} className="flex justify-between">
                <AvatarHeader
                  imageUrl={connectedUser.profile_image}
                  imageSize={40}
                  title={connectedUser.name}
                  color=""
                  className="text-(--darkgrey-text)"
                />
                <Button
                  variant="primary"
                  text=""
                  icon="Close"
                  className="p-3!"
                  onClick={() => handleRemoveConnection(connection.id)}
                />
              </div>
            );
          })}
        </div>
      )}

      {showSearch && (
        <>
          <div>
            <Input
              variant="search"
              placeholder="Search people..."
              icon="Search"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              className="bg-transparent rounded-full! border border-neutral-200 font-normal w-full"
            />
          </div>

          {/* Display connections */}
          <div className="flex flex-col gap-2">
            {loading ? (
              <p className="text-sm text-gray-500">Loading connections...</p>
            ) : filteredConnections.length > 0 ? (
              filteredConnections.map((connection) => {
                const connectedUser = connection.requester.id === user.id ? connection.addressee : connection.requester;

                return (
                  <div key={connection.id} className="flex justify-between">
                    <AvatarHeader
                      imageUrl={connectedUser.profile_image}
                      imageSize={32}
                      title={connectedUser.name}
                      color=""
                      className="text-(--lightgrey-text) text-sm"
                    />
                    <Button
                      variant="primary"
                      text=""
                      icon="Plus"
                      className="p-2!"
                      onClick={() => handleAddConnection(connection)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No connections yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
