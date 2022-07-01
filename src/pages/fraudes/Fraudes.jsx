import NewFraude from '../../components/NewFraude'
import Search from '../../components/Search'
import ShowAll from '../../components/ShowAll'
import axios from 'axios'

const Fraudes = () => {
  const [input, setInput] = useState('');
  const [countryList, setCountryList] = useState();

  const getFraudes = async () => {
    try {
      //TODO
    } catch (error) {
      
    }
    return await fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
        setCountryList(data) 
        setCountryListDefault(data)
      });
  }

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
                    <Search />
                    <ShowAll />
                    <NewFraude />
                  </div>
                </div>
              </div>
              <div className="card-body">
                // TODO table
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fraudes