import React, { useState, useEffect } from "react";
import { getDefaultState } from "../common/functions/getDefaultState";
import Footer from "../common/layouts/Footer";
import Header from "../common/layouts/Header";
import Map from "../components/map/KKO_Map";
import MenuSelecterBar from "../components/menuSelectBar/MenuSelecterBar";
import SearchBar from "../components/search/SearchBar";
import axios from "axios";

const MapPage = () => {
  const [searchResult, setSearchResult] = useState(getDefaultState());
  const [local_, setLocal] = useState("");
  const [type_, setType] = useState("");
  const [startDate_, setStartDate] = useState("");
  const [endDate_, setEndDate] = useState("");

  const [reports, setReports] = useState([]);

  const getReports = async () => {
    await axios
      .post("/report/search", searchResult, {
        headers: {
          "content-type": "text/plain",
        },
      }).then((e) => {
        setReports(e.data.data);
      });
  };
  useEffect(() => {
    console.log(searchResult);
  }, [])
  useEffect(() => {
    console.log(local_, type_, startDate_, endDate_);
    setSearchResult({ ...searchResult, search_local: local_ });
    getReports();
  }, [local_]);

  useEffect(() => {
    console.log(local_, type_, startDate_, endDate_);
    setSearchResult({ ...searchResult, search_type: type_ });
    getReports();
  }, [type_]);

  useEffect(() => {
    console.log(local_, type_, startDate_, endDate_);
    setSearchResult({ ...searchResult, search_start_date: startDate_ });
    getReports();
  }, [startDate_]);

  useEffect(() => {
    console.log(local_, type_, startDate_, endDate_);
    setSearchResult({ ...searchResult, search_end_date: endDate_ });
    getReports();
  }, [endDate_]);

  return (
    <div>
      <div>
        <SearchBar
          settingLocal={setLocal}
          settingType={setType}
          settingStartDate={setStartDate}
          settingEndDate={setEndDate}
        />
        <Map searchResult={reports} />
      </div>
    </div>
  );
};

export default MapPage;
