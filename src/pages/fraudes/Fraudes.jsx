import { useEffect,   useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import NewFraude from '../../components/NewFraude'
import Search from '../../components/Search'
import ShowAll from '../../components/ShowAll'
import { useAuth } from "../../context/Auth";
import FraudeList from '../../components/FraudeList'
import Pagination from '../../components/pagination/Pagination'

const Fraudes = () => {
  const estadosFraude = {
    pendiente: 0,
    asignado: 1,
    resuelto: 2,
    remitido: 3,
  }
  const { user } = useAuth()
  const [fraudeList, setFraudeList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [recordsPerPage] = useState(10)

  const axiosJWT = axios.create(
    {baseURL: 'http://localhost:8100/api'},
  )
  const refreshToken = async () => {    
    try {
      const result = await axios.post('http://localhost:8100/api/refresh', {
        token: user.refreshToken
      })
      user.accessToken = result.data.accessToken
      user.refreshToken = result.data.refreshToken

      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  axiosJWT.defaults.headers.common['Authorization'] = 'Bearer ' + user.accessToken
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date()
      const decodedToken = jwt_decode(user.accessToken)

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken()
        config.headers["Authorization"] = "Bearer " + data.accessToken
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const getFraudes = async () => {
    const fraude = {
      liqfra: user.userId,
      stafra: estadosFraude.pendiente + estadosFraude.asignado
    }
    try {
      const result = await axiosJWT.post('/fraudes', {
        headers: { Authorization: 'Bearer ' + user.accessToken },
        fraude,
      })

      setFraudeList(result.data)
    } catch (error) {
      console.log('Error',error)
    }
  }

  useEffect(() => {
    getFraudes()
  },[]);

  useEffect(() => {
    console.log(fraudeList.filter(itm => Object.keys(itm).some(k => JSON.stringify(itm[k]).includes(searchText))).slice(firstRecord, lastRecord) )
  }, [searchText])

  const lastRecord = currentPage * recordsPerPage
  const firstRecord = lastRecord - recordsPerPage
  const currentRecords = fraudeList.slice(firstRecord, lastRecord)
  const nPages = fraudeList.length

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className='card-title'>Fraudes</h3>
                <div className="col-auto ms-auto">
                  <div className="d-flex">
                    <Search searchText={searchText} setSearchText={setSearchText} />
                    <ShowAll />
                    <NewFraude />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <FraudeList lista={currentRecords} user={user}/>
                <Pagination totalCount={nPages} pageSize={recordsPerPage} className={'pagination-bar'} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fraudes