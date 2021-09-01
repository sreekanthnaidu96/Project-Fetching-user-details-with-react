import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserDetails.css";

function UserDetails() {
  const Api =
    "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";
  //to display 10 items in page and total 5 initial pages
  const ItemsPerPage = 9;
  const PageNumberLimit = 5;
  //usestates
  const [SearchValue, setSearchValue] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  //for controlling pages
  const [MaxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [MinPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //for controlling sorting
  const [Order, setOrder] = useState("ASC");
  const [Showbutt, setShowbutt] = useState(false);
  const ShowSort = false;
  //   after finding Index Of Last Item In Each Page
  //   now index of first item becomes last item index-items in page
  //   with these two now we can display desired amount of results in a page
  const IndexOfLastItem = CurrentPage * ItemsPerPage;
  const IndexOfFirstItem = IndexOfLastItem - ItemsPerPage;
  const ItemsToDisplayPerPage = Data.slice(IndexOfFirstItem, IndexOfLastItem);
  //   now we can show only desired amount of data on page
  //   now we need to know total no of pages and page numbers to navigate this data
  let Pages = [];
  for (let i = 0; i <= Math.ceil(Data.length / ItemsPerPage); i++) {
    Pages.push(i);
  }
  //for printing page numbers
  const PageNumbers = Pages.map((number) => {
    if (number < MaxPageNumberLimit + 1 && number > MinPageNumberLimit) {
      return (
        <li
          className={CurrentPage === number ? "active" : null}
          key={number}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  // handeling events
  const HandleNext = () => {
    setCurrentPage(CurrentPage + 1);
    if (CurrentPage + 1 > MaxPageNumberLimit) {
      setMaxPageNumberLimit(MaxPageNumberLimit + PageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit + PageNumberLimit);
    }
  };
  const HandlePrev = () => {
    setCurrentPage(CurrentPage - 1);
    if ((CurrentPage - 1) % PageNumberLimit === 0) {
      setMaxPageNumberLimit(MaxPageNumberLimit - PageNumberLimit);
      setMinPageNumberLimit(MinPageNumberLimit - PageNumberLimit);
    }
  };
  function InputHandeler(event) {
    setSearchValue(event.target.value);
  }
  // implementing sorting behaviour
  function Sorting(Col_to_sort) {
    if (Order === "ASC") {
      const sorted = [...Data].sort((a, b) =>
        a[Col_to_sort].toLowerCase() > b[Col_to_sort].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DES");
      setShowbutt(!Showbutt);
    }
    if (Order === "DES") {
      const sorted = [...Data].sort((a, b) =>
        a[Col_to_sort].toLowerCase() < b[Col_to_sort].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
      setShowbutt(!Showbutt);
    }
  }
  // for sorting AGE
  function Sorting_age(Col_to_sort) {
    if (Order === "ASC") {
      const sorted = [...Data].sort((a, b) =>
        a[Col_to_sort] > b[Col_to_sort] ? 1 : -1
      );
      setData(sorted);
      setOrder("DES");
      setShowbutt(!Showbutt);
    }
    if (Order === "DES") {
      const sorted = [...Data].sort((a, b) =>
        a[Col_to_sort] < b[Col_to_sort] ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
      setShowbutt(!Showbutt);
    }
  }
  // FOR SORTING WEBSITES
  function Sorting_website(Col_to_sort) {
    if (Order === "ASC") {
      const sorted = [...Data].sort((a, b) =>
        a[Col_to_sort].toLowerCase() > b[Col_to_sort].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DES");
      setShowbutt(!Showbutt);
    }
    if (Order === "DES") {
      const sorted = [...Data].sort((a, b) =>
        a[Col_to_sort].toLowerCase() < b[Col_to_sort].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
      setShowbutt(!Showbutt);
    }
  }
  // implementing Filter and then again maping it
  // eslint-disable-next-line
  const FilteredItems = ItemsToDisplayPerPage.filter((value) => {
    if (SearchValue === "") {
      return value;
    } else if (
      value.first_name.toLowerCase().includes(SearchValue.toLowerCase())
    ) {
      return value;
    } else if (
      value.last_name.toLowerCase().includes(SearchValue.toLowerCase())
    ) {
      return value;
    }
  }).map(({ id, first_name, last_name, age, email, web }) => (
    <tr key={id}>
      <td>
        <Link to={`/users?id=${id}`}>{first_name}</Link>
      </td>
      <td>{last_name}</td>
      <td>{age}</td>
      <td>{email}</td>
      <td>
        <a
          style={{ color: "black" }}
          target="_blank"
          rel="noreferrer"
          href={web}
        >
          {web}
        </a>
      </td>
    </tr>
  ));
  const UnFilteredData = Data.map(
    ({ id, first_name, last_name, age, email, web }) => (
      <tr key={id}>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{age}</td>
        <td>{email}</td>
        <td>
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noreferrer"
            href={web}
          >
            {web}
          </a>
        </td>
      </tr>
    )
  );
  useEffect(() => {
    const fetch_data = async () => {
      setLoading(true);
      const response = await axios.get(Api);
      setData(response.data);
      setLoading(false);
    };
    fetch_data();
  }, []);

  if (Loading) {
    return <h1 className="text-primary text-center">loading...</h1>;
  }
  return (
    <>
      <h1 className="text-center text-primary">Users</h1>
      <div className=" container input-group mb-3">
        <input
          type="text"
          value={SearchValue}
          onChange={InputHandeler}
          className="form-control"
          placeholder="Search By First Or Last Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <span className="input-group-text" id="basic-addon2">
          <i
            onClick={(event) => {
              event.preventDefault();
            }}
            className="fas fa-search"
          ></i>
        </span>
      </div>
      <div className="container">
        <table className="table  table-hover">
          <tbody>
            <tr>
              <th>
                First name{" "}
                <i
                  onClick={() => {
                    Sorting("first_name");
                  }}
                  className="fas fa-sort-down"
                ></i>
              </th>
              <th>
                Last name{" "}
                <i
                  onClick={() => {
                    Sorting("last_name");
                  }}
                  className="fas fa-sort-down"
                ></i>
              </th>
              <th>
                Age{" "}
                <i
                  onClick={() => {
                    Sorting_age("age");
                  }}
                  className="fas fa-sort-down"
                ></i>
              </th>
              <th>
                Email{" "}
                <i
                  onClick={() => {
                    Sorting("email");
                  }}
                  className="fas fa-sort-down"
                ></i>
              </th>
              <th>
                Website{" "}
                <i
                  onClick={() => {
                    Sorting_website("web");
                  }}
                  className="fas fa-sort-down"
                ></i>
              </th>
            </tr>
            {ShowSort ? UnFilteredData : FilteredItems}
          </tbody>
        </table>
        <ul className="pagenumbers">
          <li>
            <button onClick={HandlePrev}>Prev</button>
          </li>
          {PageNumbers}
          <li>
            <button onClick={HandleNext}>Next</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserDetails;
