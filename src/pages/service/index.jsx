// import * as React from "react";
// import { Service } from "@modal";
// import { Button } from "@mui/material";
// import { ServiceTable } from "@ui";
// import { useEffect, useState } from "react";
// import { service } from "@service";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const Index = () => {
//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const getData = async () => {
//     try {
//       const response = await service.get();
//       if (response.status === 200 && response?.data?.services) {
//         setData(response.data.services);
//       }
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <>
//       <Service open={open} handleClose={() => setOpen(false)} />
//       <div className="flex flex-col gap-3">
//         <div className="flex justify-end">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpen(true)}
//           >
//             Add
//           </Button>
//         </div>
//         <ServiceTable data={currentItems} />
//         <Stack spacing={2} alignItems="center">
//           <Pagination
//             count={Math.ceil(data.length / itemsPerPage)}
//             page={currentPage}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Stack>
//       </div>
//     </>
//   );
// };

// export default Index;


import * as React from "react";
import { Service } from "@modal";
import { Button } from "@mui/material";
import { ServiceTable } from "@ui";
import { useEffect, useState } from "react";
import { service } from "@service";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      const response = await service.get();
      if (response.status === 200 && response?.data?.services) {
        setData(response.data.services);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Service open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-[2px] border-blue p-2"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
        <ServiceTable data={currentItems} />
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default Index;
