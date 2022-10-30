import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import "../../styles/coachClients.scss";

const CoachClients = ({ username, selectedClientId, setSelectedClientId }) => {
  const [selectedClient, setSelectedClient] = useState({});
  const dispatch = useDispatch();
  const coachClients = useSelector((state) => state?.coach?.coachClients);

  useEffect(() => {
    if (coachClients.length) {
      let existingClient = coachClients?.filter(
        (x) => x?.username == selectedClientId
      )[0];
      if (existingClient) {
        setSelectedClient(existingClient);
      } else {
        setSelectedClient(coachClients[0]);
        setSelectedClientId(coachClients[0]?.username);
      }
    }
  }, [coachClients]);

  const onClientClick = (client) => {
    setSelectedClientId(client?.username);
    setSelectedClient(client);
  };

  return (
    <div className="coachClients">
      <div className="coachClients__clientList">
        {coachClients.length ? (
          coachClients.map((client) => (
            <div
              key={client.username}
              className={`clientTab ${
                selectedClient?.username === client.username &&
                "clientTab--selected"
              }`}
              onClick={() => onClientClick(client)}
            >
              <PermIdentityIcon className="icon" />
              {client?.firstName + " " + client?.lastName}
            </div>
          ))
        ) : (
          <div style={{ marginTop: "40px" }}>
            You don't have any clients as of now!
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachClients;
