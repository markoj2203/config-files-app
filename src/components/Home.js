import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Home() {
  const token = useSelector((state) => state.getAuthToken.token);
  const [data, setData] = useState([]);
  const [configData, setConfigData] = useState([]);

  const changeConfig = (event) => {
    setConfigData(event.target.value);
  };

  const authAxios = axios.create({
    baseURL: "https://l5ov8zep98.execute-api.us-west-2.amazonaws.com/api",
    headers: {
      Authorization: token,
    },
  });

  const getConfigData = async (confName, confVersion) => {
    try {
      await authAxios
        .get(`/config/${confName}`, { params: { version: confVersion } })
        .then((result) => {
          setConfigData(JSON.stringify(result.data.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loadConfigurationFiles = async () => {
    try {
      await authAxios.get("/config").then((result) => {
        //console.log(result.data);
        setData(result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadConfigurationFiles();
  }, []);

  return (
    <div className="content-block">
      <div className="content-heading" style={{ paddingTop: "5%" }}>
        <h2>Cofiguration Files List</h2>
      </div>
      <div className="list-group" style={{ marginTop: "5%" }}>
        {data.map((item, i) => (
          <div
            className="list-group-item list-group-item-action"
            onClick={() => getConfigData(item.config_name, item.config_version)}
            key={i}
            title="Click on item to show config data!"
          >
            {item.config_name + " - " + item.config_version}
          </div>
        ))}
      </div>
      {configData === undefined ? (
        ""
      ) : (
        <div style={{ width: "100%", paddingTop: "5%" }}>
          <textarea
            name="description"
            value={configData}
            onChange={changeConfig}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
