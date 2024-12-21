import axiosInstance from './axiosInstance'

export const searchAnswerApi = async (answer) => {
  // const { data } = await axiosInstance.post('/chat', { task: answer })
  // console.log(data)
  // return data
  const { data } = await axiosInstance.post('/openAi', { text: answer })
  console.log(data)
  return data
}
