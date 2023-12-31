import endpoint from '../../config';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../editwindowcss.css';
import TestPDF from './TestPDF';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Worktimesheet() {
  const styles = {
    th: {
      minWidth: "4rem"
    }
  };
  const [dataset, setDataset] = useState([]);


  // Generate an array containing numbers from 21 to 31
  const range1 = Array.from({ length: 11 }, (_, i) => i + 21);

  // Generate an array containing numbers from 1 to 20
  const range2 = Array.from({ length: 20 }, (_, i) => i + 1);

  // Combine the two ranges into a single array
  const combinedRange = [...range1, ...range2];


  const [countWork, setCountWork] = useState(0);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [checked9, setChecked9] = useState(false);
  const [checked10, setChecked10] = useState(false);
  const [checked11, setChecked11] = useState(false);
  const [checked12, setChecked12] = useState(false);
  const [checked13, setChecked113] = useState(false);
  const [checked14, setChecked14] = useState(false);
  const [checked15, setChecked15] = useState(false);
  const [checked16, setChecked16] = useState(false);
  const [checked17, setChecked17] = useState(false);
  const [checked18, setChecked18] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);

  const [checked28, setChecked28] = useState(false);
  const [checked31, setChecked31] = useState(false);


  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    setMonth("01");
  }, []);

  const [searchWorkplaceId, setSearchWorkplaceId] = useState(''); //รหัสหน่วยงาน
  const [searchWorkplaceName, setSearchWorkplaceName] = useState(''); //ชื่อหน่วยงาน
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchResult1, setSearchResult1] = useState([]);

  const [woekplace, setWoekplace] = useState([]);

  async function handleSearch(event) {
    event.preventDefault();
    // get value from form search
    const data = await {
      employeeId: searchEmployeeId,
      employeeName: searchEmployeeName,
      month: month
    }; console.log(searchEmployeeId);

    const parsedNumber = await parseInt(month, 10) - 1;
    const formattedResult = await String(parsedNumber).padStart(2, '0');
    // await alert(formattedResult );

    const data1 = await {
      employeeId: searchEmployeeId,
      employeeName: searchEmployeeName,
      month: formattedResult
    };
    // console.log(searchEmployeeId);
    // alert(data1.month);

    try {

      const response = await axios.post(endpoint + '/timerecord/searchemp', data);

      if (response.data.recordworkplace.length >= 1) {
        await setSearchResult(response.data.recordworkplace);
      } else {
        alert("ไม่พบข้อมูล 1 ถึง 20 " + getMonthName(data.month));
      }

      // if (data1.month == '00') {
      //   data1.month = '12';
      // }
      // const response1 = await axios.post(endpoint + '/timerecord/searchemp', data1);
      // if (response1.data.recordworkplace.length >= 1) {
      //   await setSearchResult1(response1.data.recordworkplace);
      // } else {
      //   alert("ไม่พบข้อมูล 21 ถึง สิ้นเดือน " + getMonthName(data1.month ) );
      // }

      // // await alert(data1.month + ' : '+ response1.data.recordworkplace.length )
      // // await alert(data.month + ' : '+ response.data.recordworkplace.length )

      // // await alert(searchResult[0].employee_workplaceRecord.length);

      // // alert(JSON.stringify(response.data , null, 2) );
      // // await alert(searchResult[0].employee_workplaceRecord[0].workplaceId );

      const employeeWorkplaceRecords = await response.data.recordworkplace[0].employee_workplaceRecord || '';
      // const employeeWorkplaceRecords1 = await response1.data.recordworkplace[0].employee_workplaceRecord || '';

      // // xx
      // if (employeeWorkplaceRecords1.length > 0) {
      //   const dates1 = employeeWorkplaceRecords1.map(record => record.date);
      //   // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

      //   const allTimeA1 = employeeWorkplaceRecords1.map((record) => record.allTime);

      //   const workplaceId1 = employeeWorkplaceRecords1.map(record => record.workplaceId);

      //   const otTime1 = employeeWorkplaceRecords1.map((record) => record.otTime);

      //   // setDataset(
      //   //   employeeWorkplaceRecords1.filter((record) => record.date) // Filter out records with null or undefined dates
      //   //     .map((record) => {
      //   //       return record;
      //   //     })
      //   // );

      //   setTableData((prevState) => {
      //     const updatedData = [...prevState];
      //     dates1.forEach((date1, index) => {
      //       const dataIndex1 = parseInt(date1, 10) - 1; // Subtract 1 because indices are zero-based
      //       if (dataIndex1 >= 0 && dataIndex1 < updatedData.length) {

      //         if (dataIndex1 >= 21 && dataIndex1 <= 31) {
      //           // alert(dataIndex1 +' .');

      //           updatedData[(dataIndex1 - 20)].isChecked = true;
      //           updatedData[(dataIndex1 - 20)].otTime = otTime1[index];
      //           updatedData[(dataIndex1 - 20)].allTimeA = allTimeA1[index];
      //           updatedData[(dataIndex1 - 20)].workplaceId = workplaceId1[index]; // Set otTime at the same index as dates
      //           updatedData[(dataIndex1 - 20)].date = dates1[index]; // Set otTime at the same index as dates

      //           // Set otTime at the same index as dates

      //         }

      //       }
      //     });
      //     const filteredData = updatedData.filter((record) => record.isChecked == true);
      //     setDataset(filteredData);
      //     return updatedData;

      //   });

      //   // setWoekplace(dates);

      // }
      // // xx

      if (employeeWorkplaceRecords.length > 0) {
        const dates = employeeWorkplaceRecords.map(record => record.date);
        // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

        const allTimeA = employeeWorkplaceRecords.map((record) => record.allTime);

        const workplaceId = employeeWorkplaceRecords.map(record => record.workplaceId);

        const otTime = employeeWorkplaceRecords.map((record) => record.otTime);

        // setDataset(
        //   employeeWorkplaceRecords
        //     .filter((record) => record.date) // Filter out records with null or undefined dates
        //     .map((record) => {
        //       return record;
        //     })
        // );
        setTableData((prevState) => {
          const updatedData = [...prevState];
          dates.forEach((date, index) => {
            const dataIndex = parseInt(date, 10) - 1; // Subtract 1 because indices are zero-based
            // alert(index);
            if (dataIndex >= 0 && dataIndex < updatedData.length) {
              if (dataIndex <= 20) {
                setCountWork(countWork + 1);

                updatedData[(dataIndex + 11)].isChecked = true;
                updatedData[(dataIndex + 11)].otTime = otTime[index];
                updatedData[(dataIndex + 11)].allTimeA = allTimeA[index];
                updatedData[(dataIndex + 11)].workplaceId = workplaceId[index]; // Set otTime at the same index as dates
                updatedData[(dataIndex + 11)].date = dates[index]; // Set otTime at the same index as dates


                // Set otTime at the same index as dates

              }

            }
          });
          const filteredData = updatedData.filter((record) => record.isChecked == true);
          setDataset(filteredData);
          return updatedData;
        });

        setWoekplace(dates);
        console.log('tableData1',tableData);


        // console.log('Dates:', dates);
        // console.log('time:', otTime);
        console.log('workplaceId:', workplaceId);

      }

      /////////

      // alert(response.data.recordworkplace.length);
      if (response.data.recordworkplace.length < 1) {
        window.location.reload();
        alert('ไม่พบข้อมูล');
      } else {

        // Set search values
        await setEmployeeId(response.data.recordworkplace[0].employeeId);
        await setName(response.data.recordworkplace[0].employeeName);


        // setWoekplace(response.data.recordworkplace[0].employee_workplaceRecord[0].workplaceName);

        // setSearchEmployeeId(response.data.employees[0].employeeId);
        // setSearchEmployeeName(response.data.employees[0].name);
        setSearchEmployeeId('');
        setSearchEmployeeName('');

      }
    } catch (error) {
      alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา');
      // window.location.reload();
    }

    try {

      if (data1.month == '00') {
        data1.month = '12';
      }
      const response1 = await axios.post(endpoint + '/timerecord/searchemp', data1);
      if (response1.data.recordworkplace.length >= 1) {
        await setSearchResult1(response1.data.recordworkplace);
      } else {
        alert("ไม่พบข้อมูล 21 ถึง สิ้นเดือน " + getMonthName(data1.month));
      }

      // await alert(data1.month + ' : '+ response1.data.recordworkplace.length )
      // await alert(data.month + ' : '+ response.data.recordworkplace.length )

      const employeeWorkplaceRecords1 = await response1.data.recordworkplace[0].employee_workplaceRecord || '';

      if (employeeWorkplaceRecords1.length > 0) {
        const dates1 = await employeeWorkplaceRecords1.map(record => record.date);
        // const otTime = employeeWorkplaceRecords.map(record => record.otTime);

        const allTimeA1 = await employeeWorkplaceRecords1.map((record) => record.allTime);

        const workplaceId1 = await employeeWorkplaceRecords1.map(record => record.workplaceId);

        const otTime1 = await employeeWorkplaceRecords1.map((record) => record.otTime);

        await setTableData(async (prevState) => {
          const updatedData = await [...prevState];
          dates1.forEach(async (date1, index) => {
            const dataIndex1 = await parseInt(date1, 10) - 1; // Subtract 1 because indices are zero-based
            if (dataIndex1 >= 0 && dataIndex1 < updatedData.length) {

              if (dataIndex1 >= 20 && dataIndex1 <= 31) {
                // alert(dataIndex1 +' .');
                await setCountWork(countWork + 1);
                // alert((dataIndex1 - 20));

                updatedData[(dataIndex1 - 20)].isChecked = await true;
                updatedData[(dataIndex1 - 20)].otTime = await otTime1[index];
                updatedData[(dataIndex1 - 20)].allTimeA = await allTimeA1[index];
                updatedData[(dataIndex1 - 20)].workplaceId = await workplaceId1[index]; // Set otTime at the same index as dates
                updatedData[(dataIndex1 - 20)].date = await dates1[index]; // Set otTime at the same index as dates

                // Set otTime at the same index as dates

              }

            }
          });
          const filteredData = await updatedData.filter((record) => record.isChecked == true);
          await setDataset(filteredData);
          return updatedData;

        });
        setWoekplace(dates);
        console.log('tableData2',tableData);



      }

    }
    catch (error) {
      alert('กรุณาตรวจสอบข้อมูลในช่องค้นหา', error);
      // window.location.reload();
    }

  }

  console.log("searchResult", searchResult);
  console.log(woekplace);


  console.log(dataset);

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   if (name === 'checked28') {
  //     setChecked28(checked);
  //   } else if (name === 'checked31') {
  //     setChecked31(checked);
  //   }
  // };



  const [tableData, setTableData] = useState(
    combinedRange.map((index) => ({
      isChecked: false, // Initial state of the checkbox
      textValue: '',    // Initial state of the text value
      workplaceId: index, // Store the workplaceId
      date: '', // Store the workplaceId
    }))
  );
  // const [tableData, setTableData] = useState(
  //   new Array(31).fill('').map((_, index) => ({
  //     isChecked: false,
  //     textValue: '',
  //   }))
  // );

  // useEffect(() => {
  //   const dates = ['28', '29']; // Example dates

  //   setTableData((prevState) => {
  //     const updatedData = [...prevState];
  //     dates.forEach((date) => {
  //       const index = parseInt(date, 10) - 1; // Subtract 1 because indices are zero-based
  //       if (index >= 0 && index < updatedData.length) {
  //         updatedData[index].isChecked = true;
  //       }
  //     });
  //     return updatedData;
  //   });
  // }, []); // The empty dependency array ensures this effect runs only once on component mount

  const handleCheckboxChange = (index) => {
    setTableData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index].isChecked = !updatedData[index].isChecked;
      return updatedData;
    });
  };

  const handleTextChange = (index, event) => {
    const { value } = event.target;
    setTableData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index].textValue = value;
      return updatedData;
    });
  };


  ///PDF///////////////////////
  // const [dataset, setDataset] = useState([]);
  const [monthset, setMonthset] = useState(''); // Example: February (you can set it dynamically)

  useEffect(() => {
    setMonthset(month);
  }, [month]);

  // useState(() => {
  //   const tableDataDate = tableData.filter(item => item.date !== null && item.date !== '');
  //   setDataset(tableDataDate);
  // }, [tableData]);

  // useState(() => {
  //   const filteredData = tableData.filter((record) => record.isChecked == false);
  //   setDataset(filteredData);
  // }, [tableData]);

  // setDataset(
  //   employeeWorkplaceRecords
  //     .filter((record) => record.date) // Filter out records with null or undefined dates
  //     .map((record) => {
  //       return record;
  //     })
  // );


  const [year, setYear] = useState(2023); // Example year (you can set it dynamically)
  const [calendarData, setCalendarData] = useState([]);

  // console.log(tableData);
  console.log("dataset", dataset);
  console.log("tableData", tableData);
  console.log("month " + monthset);

  const [workMonth, setWorkMonth] = useState([]);

  const generateText = () => {
    return searchResult.map((employeerecord) => (
      'ประจำเดือน ' + getMonthName(employeerecord.month) +
      ' ตั้งแต่วันที่ 21 ' + getMonthName(parseInt(employeerecord.month, 10) - 1) +
      ' ถึง 20 ' + getMonthName(employeerecord.month) +
      ' ' + (parseInt(employeerecord.timerecordId, 10) + 543)
    )).join(' '); // Join the generated text into a single string
  };

  // Call generateText when the component mounts or when searchResult changes
  useEffect(() => {
    const text = generateText();
    setWorkMonth(text);
  }, [searchResult]);

  const generatePDF = async () => {
    try {
      const doc = new jsPDF('landscape');

      // Load the Thai font
      const fontPath = '/assets/fonts/THSarabunNew.ttf';
      doc.addFileToVFS(fontPath);
      doc.addFont(fontPath, 'THSarabunNew', 'normal');

      // Override the default styles for jspdf-autotable
      const styles = {
        font: 'THSarabunNew',
        fontStyle: 'normal',
        fontSize: 10,
      };
      const tableOptions = {
        styles: styles,
        startY: 25,
        // margin: { top: 10 },
      };

      const title = ' ใบลงเวลาการปฏิบัติงาน';

      // Set title with the Thai font
      doc.setFont('THSarabunNew');
      doc.setFontSize(16);
      const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleX = (pageWidth - titleWidth) / 2;
      doc.text(title, titleX, 10);

      const subTitle = workMonth; // Replace with your desired subtitle text
      doc.setFontSize(12); // You can adjust the font size for the subtitle
      const subTitleWidth = doc.getStringUnitWidth(subTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const subTitleX = (pageWidth - subTitleWidth) / 2;
      doc.text(subTitle, subTitleX, 20); // Adjust the vertical position as needed

      // Calculate the number of days in the month, considering February and leap years
      const daysInMonth = (monthset === '02' && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) ? 29 :
        (monthset === '02') ? 28 :
          [4, 6, 9, 11].includes(monthset) ? 30 : 31;

      // Calculate the starting point for the table header
      let startingDay = 21;

      // Generate the header with a single cycle of "01" to "20" followed by "21" to the last day of the month
      const header = Array.from({ length: daysInMonth }, (_, index) => {
        const day = (index + startingDay) > daysInMonth ? (index + startingDay - daysInMonth) : (index + startingDay);

        // Add leading zeros for days 1 to 9
        const formattedDay = day < 10 ? `0${day}` : day.toString();

        return formattedDay;
      });

      // Assuming that 'date' contains values like '01', '02', ..., '28', '29', '30', '31'
      // You can replace 'date' with the actual field name containing the date information in your data
      const dateFieldName = 'date';

      // Create an object to store data rows by date
      const rowDataByDate = {};

      // Organize the dataset into the rowDataByDate object
      dataset.forEach((data) => {
        // dataset.forEach((data) => {

        const date = data[dateFieldName];
        if (!rowDataByDate[date]) {
          rowDataByDate[date] = { workplaceId: [], otTime: [], dateFieldName: [] };
        }
        rowDataByDate[date].workplaceId.push(data.workplaceId);
        rowDataByDate[date].otTime.push(data.otTime);
        rowDataByDate[date].dateFieldName.push(data[dateFieldName]);
      });

      // Map the header to transposedTableData using the rowDataByDate object
      const transposedTableData = header.map((headerDay) => {
        const rowData = rowDataByDate[headerDay];

        if (rowData) {
          return [
            rowData.workplaceId.join(', '),
            rowData.otTime.join(', '),
            rowData.dateFieldName.join(', '),
          ];
        } else {
          return ['', '', ''];
        }
      });

      // Transpose the transposedTableData to sort horizontally
      const sortedTableData = Array.from({ length: 3 }, (_, index) =>
        transposedTableData.map((row) => row[index])
      );

      const textColumn = [name, 'ot', 'day'];

      const sortedTableDataWithText = sortedTableData.map((data, index) => {
        const text = [textColumn[index]];
        return [...text, ...data];
      });

      // Now, sortedTableDataWithText contains the text column followed by sorted data columns.


      // Add header and data to the table
      // doc.autoTable({
      //   head: [['head', ...header]],
      //   body: sortedTableData,
      //   ...tableOptions,
      // });

      // style table
      // style table

      const customHeaders = [
        ['วันที่', ...header],
      ];


      // Add custom headers and data to the table
      doc.autoTable({
        head: customHeaders,
        body: sortedTableDataWithText,
        ...tableOptions,
      });

      const additionalTableData = [
        ['Cell 1', 'Cell 2', 'Cell 3'],
        ['Cell 4', 'Cell 5', 'Cell 6'],
        ['Cell 7', 'Cell 8', 'Cell 9'],
      ];

      // Define options for the additional table
      const additionalTableOptions = {
        startY: 80, // Adjust the vertical position as needed
        styles: styles,
      };

      // Add the additional table to the PDF
      doc.autoTable({
        body: additionalTableData,
        ...additionalTableOptions,
      });

      console.log(dataset);
      doc.save('example.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };



  return (
    // <div>
    <body class="hold-transition sidebar-mini" className='editlaout'>
      <div class="wrapper">
        <div class="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><i class="fas fa-home"></i> <a href="index.php">หน้าหลัก</a></li>
            <li class="breadcrumb-item"><a href="#"> ระบบเงินเดือน</a></li>
            <li class="breadcrumb-item active">ใบลงเวลาการปฏิบัติงาน</li>
          </ol>
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <h1 class="m-0"><i class="far fa-arrow-alt-circle-right"></i> ใบลงเวลาการปฏิบัติงาน</h1>
              </div>
            </div>
          </div>
          {/* <!-- /.content-header -->
<!-- Main content --> */}

          <section class="content">
            <div class="row">
              <div class="col-md-7">
                <section class="Frame">
                  <div class="col-md-12">
                    <h2 class="title">ค้นหา</h2>
                    <div class="col-md-12">
                      <form onSubmit={handleSearch}>
                        <div class="row">
                          <div class="col-md-3">
                            <div class="form-group">
                              <label role="searchEmployeeId">รหัสพนักงาน</label>
                              <input type="text" class="form-control" id="searchEmployeeId" placeholder="รหัสพนักงาน" value={searchEmployeeId} onChange={(e) => setSearchEmployeeId(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label role="searchname">ชื่อพนักงาน</label>
                              <input type="text" class="form-control" id="searchname" placeholder="ชื่อพนักงาน" value={searchEmployeeName} onChange={(e) => setSearchEmployeeName(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label role="searchEmployeeId">เดือน</label>
                              <select className="form-control" value={month} onChange={(e) => setMonth(e.target.value)} >
                                <option value="01">มกราคม</option>
                                <option value="02">กุมภาพันธ์</option>
                                <option value="03">มีนาคม</option>
                                <option value="04">เมษายน</option>
                                <option value="05">พฤษภาคม</option>
                                <option value="06">มิถุนายน</option>
                                <option value="07">กรกฎาคม</option>
                                <option value="08">สิงหาคม</option>
                                <option value="09">กันยายน</option>
                                <option value="10">ตุลาคม</option>
                                <option value="11">พฤศจิกายน</option>
                                <option value="12">ธันวาคม</option>
                              </select>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group" style={{ position: 'absolute', bottom: '0' }}>
                                <button class="btn b_save"><i class="nav-icon fas fa-search"></i> &nbsp; ค้นหา</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div class="d-flex justify-content-center">
                        <h2 class="title">ผลลัพธ์ {searchResult.length} รายการ</h2>
                      </div>
                      <div class="d-flex justify-content-center">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <ul style={{ listStyle: 'none', marginLeft: "-2rem" }}>
                                {searchResult.map(workplace => (
                                  <li
                                    key={workplace.employeeId}
                                    onClick={() => handleClickResult(workplace)}
                                  >
                                    รหัส {workplace.employeeId || ''} ชื่อพนักงาน {workplace.employeeName || ''}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

            </div>

            <div class="row">
              <div class="col-md-2">
                {searchResult.map((
                  employeerecord) => (
                  employeerecord.employeeId + ': ชื่อพนักงาน ' + employeerecord.employeeName)
                )}
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-2">
                {searchResult.map((
                  employeerecord) => (
                  '                ชื่อ :                   ' + employeerecord.employeeName)
                )}
              </div>
              <div class="col-md-3">
                {searchResult.map((
                  employeerecord) => (
                    'ประจำเดือน ' + getMonthName(employeerecord.month)
                    + 'ตั้งแต่วันที่ 21 ' + getMonthName(parseInt(employeerecord.month, 10) - 1)
                    + ' ถึง 20 ' + getMonthName(employeerecord.month))
                  + '  ' + (parseInt(employeerecord.timerecordId, 10) + 543)
                )}
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">
                วันทำงานทั้งหมด {countWork} วัน
              </div>
            </div>

            <form>
              <div class="row">
                <div class="col-md-9">
                  <section class="Frame">
                    <div class="container" style={{ overflowX: 'scroll' }}>
                      <table class="table table-bordered ">
                        <thead>
                          <tr>
                            <th style={styles.th}>Number</th>
                            {combinedRange.map((number, index) => (
                              <th key={index} style={styles.th}>{number}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>วันทำงาน</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="checkbox"
                                  className="form-control custom-checkbox"
                                  checked={data.isChecked}
                                  disabled={true}
                                  onChange={() => handleCheckboxChange(index)}
                                  style={{ color: 'black' }}
                                />
                                {data.workplaceId}

                              </td>

                            ))}

                          </tr>
                          <tr>
                            <td>ช.ม. ทำงาน</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={data.allTimeA}
                                  onChange={(event) => handleTextChange(index, event)}
                                />
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td>ช.ม. โอที</td>
                            {tableData.map((data, index) => (
                              <td key={index}>
                                <input
                                  type="text"
                                  class="form-control"
                                  value={data.textValue}
                                  onChange={(event) => handleTextChange(index, event)}
                                />
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <label>
                      <input
                        type="checkbox"
                        name="checked28"
                        checked={checked28}
                        onChange={handleCheckboxChange}
                      />
                      Checked 28
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        name="checked31"
                        checked={checked31}
                        onChange={handleCheckboxChange}
                      />
                      Checked 31
                    </label> */}
                    {/* Add more checkboxes as needed */}

                    {/* <ul>
                      {woekplace.map((date, index) => (
                        <li key={index}><input type="date" value={date}/></li>
                      ))}
                    </ul> */}

                  </section>
                </div>
                <div class="col-md-3">
                  {/* <div style={{
                    position: "absolute",
                    bottom: "2rem",
                    right: "0px"
                  }}>
                    <TestPDF />
                  </div> */}
                  <div>
                    <button id="generatePdfButton" onClick={generatePDF}>Generate PDF</button>
                  </div>
                </div>
              </div>
            </form>
            {/* </form> */}
          </section>
          {/* <!-- /.content --> */}
        </div >
      </div >


    </body >
  )
}

function getMonthName(monthNumber) {
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];


  // Ensure the monthNumber is within a valid range (1-12)
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]; // Months array is 0-based
  } else {
    // return 'Invalid Month';
    return months[12]; // Months array is 12 -based

  }
}
export default Worktimesheet