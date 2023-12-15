import axios from 'axios';

const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export { fetchData };
// src/services/api.js
export const getRooms = async () => {
  // Fetch rooms from the backend
  // Example: const response = await fetch('/api/rooms');
  // const data = await response.json();
  // return data;
  return [
    {
      so_phong: "A101",
      so_tang: "1",
      loai_phong: "Đôi",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A102",
      so_tang: "2",
      loai_phong: "Đơn",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A103",
      so_tang: "3",
      loai_phong: "Đôi",
      hang_phong: "Bình thường",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong:"1.000.000vnd",
    },
    {
      so_phong: "A104",
      so_tang: "1",
      loai_phong: "Đơn",
      hang_phong: "Bình thường",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong:"1.000.000vnd",
    },
    {
      so_phong: "A105",
      so_tang: "1",
      loai_phong: "Đơn",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A106",
      so_tang: "1",
      loai_phong: "Đôi",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
  ];
};

export const getBookings = async () => {
  // Fetch rooms from the backend
  // Example: const response = await fetch('/api/rooms');
  // const data = await response.json();
  // return data;
  return [
    {
      so_phong: "A101",
      so_tang: "1",
      loai_phong: "Đơn",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A102",
      so_tang: "2",
      loai_phong: "Đơn",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A103",
      so_tang: "2",
      loai_phong: "Đôi",
      hang_phong: "Bình thường",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong:"1.000.000vnd",
    },
    {
      so_phong: "A104",
      so_tang: "1",
      loai_phong: "Đơn",
      hang_phong: "Bình thường",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A105",
      so_tang: "1",
      loai_phong: "Đơn",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong: "1.000.000vnd",
    },
    {
      so_phong: "A106",
      so_tang: "1",
      loai_phong: "Đôi",
      hang_phong: "VIP",
      trang_thai: "Trống",
      hinh_anh: [
        "https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_DLXK_01-340x227.jpg",
        "https://www.hotelgrandsaigon.com/wp-content/upload…ites/227/2017/12/GRAND_LSSK_LIVING_02-340x227.jpg",
      ],
      gia_phong:"1.000.000vnd",
    },
  ];
};


function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}