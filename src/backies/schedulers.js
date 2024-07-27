import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;


export const getAllSchedules = async () => {
    try {
        const response = await axios.get(`${baseUrl}/schedule/scheduler`);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const updateSchedule = async (id, data) => {
    try {
        const response = await axios.put(`${baseUrl}/schedule/scheduler/${id}`, data);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const updateTelco = async (id, data) => {
    try {
        const response = await axios.put(`${baseUrl}/provider/telco/${id}`, data);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/signin`, data);
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const userInfo = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/auth/userinfo/${token}`);
        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const getAllPins = async () => {
    try {
        const response = await axios.get(`${baseUrl}/pin/`);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const getAllTelcos = async () => {
    try {
        const response = await axios.get(`${baseUrl}/provider/telco`);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const getAllSoldPins = async () => {
    try {
        const response = await axios.get(`${baseUrl}/pin/sold`);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const getReminder = async () => {
    try {
        const response = await axios.get(`${baseUrl}/pin/unhinge/check`);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const getAllUnsoldPins = async () => {
    try {
        const response = await axios.get(`${baseUrl}/pin/unsold`);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const createScheduler = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/schedule/scheduler`, data);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

export const createTelcoProvider = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/provider/telco`, data);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};


export const createUser = async (usertype, data) => {
    if (usertype !== 'admin') {
        return {
            data: 'Unauthorized',
            status: 404
        }
    }
    try {
        const response = await axios.post(`${baseUrl}/auth/signup`, data);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};

// export const getUserOrders = async (user) => {
//     try {
//         const response = await axios.get(`${baseUrl}/pin/vend/${user}`);

//         return {
//             data: response.data,
//             status: response.status
//         }
//     } catch (error) {
//         return {
//             data: error.response ? error.response.data : 'Network Error',
//             status: error.response ? error.response.status : 500
//         };
//     }
// };

export const getUserOrders = async (user, query = {}, dateOption = '', customStartDate, customEndDate, page = 1, limit = 10, sortOrder = 'asc') => {
  try {
    const queryParams = new URLSearchParams({
      query: JSON.stringify(query),
      dateOption,
      customStartDate: customStartDate ? customStartDate : '',
      customEndDate: customEndDate ? customEndDate : '',
    //   customStartDate: customStartDate ? customStartDate.toISOString() : '',
    //   customEndDate: customEndDate ? customEndDate.toISOString() : '',
      page: page.toString(),
      limit: limit.toString(),
      sortOrder
    });

    const response = await axios.get(`${baseUrl}/pin/vend/${user}?${queryParams.toString()}`);

    return {
      data: response.data,
      status: response.status
    };
  } catch (error) {
    return {
      data: error.response ? error.response.data : 'Network Error',
      status: error.response ? error.response.status : 500
    };
  }
};


export const createUserOrders = async (user, cart) => {
    try {
        const response = await axios.post(`${baseUrl}/pin/vend/${user}`, cart);

        return {
            data: response.data,
            status: response.status
        }
    } catch (error) {
        return {
            data: error.response ? error.response.data : 'Network Error',
            status: error.response ? error.response.status : 500
        };
    }
};




