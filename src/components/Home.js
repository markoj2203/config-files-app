import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Home() {
  const token = useSelector((state) => state.getAuthToken.token);
  const [data, setData] = useState([]);
  const [configData, setConfigData] = useState([]);
  const [configName, setConfigName] = useState("");
  const [configVersion, setConfigVersion] = useState("");
  const [newConfig, setNewConfig] = useState("");
  const [headName, setHeadName] = useState("New");

  const changeConfig = (event) => {
    setConfigData(event.target.value);
  };

  const editConfigFile = () => {
    document.getElementById("confText").disabled = false;
    document.getElementById("name").disabled = false;
    document.getElementById("version").disabled = false;
    document.getElementById("editBtn").style.display = "none";
    document.getElementById("saveBtn").style.display = "block";
  };

  const saveConfigFile = async (configName, configVersion) => {
    console.log(configName, configVersion);
    try {
      await authAxios
        .post(`/config`, {
          name: "test", //configName,
          version: "1.0.3", //configVersion,
          data: JSON.parse(configData),
        })
        .then((result) => {
          setNewConfig(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const authAxios = axios.create({
    baseURL: "https://l5ov8zep98.execute-api.us-west-2.amazonaws.com/api",
    headers: {
      Authorization: token,
    },
  });

  const getConfigData = async (confName, confVersion) => {
    document.getElementById("confText").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("version").disabled = true;
    document.getElementById("editBtn").style.display = "block";
    document.getElementById("saveBtn").style.display = "none";
    setConfigName(confName);
    setConfigVersion(confVersion);
    setHeadName("Edit");
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
        setData(result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadConfigurationFiles();
  }, [newConfig]);

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
          <div>
            <h4>{headName} config file</h4>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{ padding: "2%" }}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter file name"
              value={configName}
            />
            <label htmlFor="exampleInputEmail1" style={{ padding: "2%" }}>
              Version
            </label>
            <input
              type="text"
              className="form-control"
              id="version"
              placeholder="Enter file version"
              value={configVersion}
            />
          </div>
          <textarea
            id="confText"
            name="description"
            value={configData}
            onChange={changeConfig}
            style={{ width: "100%" }}
            placeholder="...text need to be in JSON format ...example {'a':'1','b':'2'}"
          />
          <button
            id="editBtn"
            type="button"
            className="btn btn-primary"
            onClick={editConfigFile}
            style={{ display: "none", float: "right" }}
          >
            Edit
          </button>
          <button
            id="saveBtn"
            type="button"
            className="btn btn-primary"
            onClick={() => saveConfigFile(configName, configVersion)}
            style={{ float: "right" }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
