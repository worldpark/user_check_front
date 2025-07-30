import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "@/api/axiosInstance.jsx";

const KakaoMap = (props) => {

    const loginInfo = useSelector((state) => state.loginInfo);

    const getAttendanceSetting = () => {
        axios.get('/api/setting',{
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {

            const markLat = response.data.latitude;
            const markLng = response.data.longitude;

            setMarkPosition({
                markLat: markLat,
                markLng: markLng
            })

            navigator.geolocation.getCurrentPosition((position) => {

                const userPosition = {
                    userLat: position.coords.latitude,
                    userLng: position.coords.longitude
                }
                let distanceValue = getDistance(userPosition, markLat, markLng);
                setDistance(distanceValue);
            })

        }).catch((error) => {
            console.log(error);
        })
    }

    const getDistance = (userPosition, lat, lon) => {

        const R = 6371e3;
        const dLat = (lat - userPosition.userLat) * (Math.PI / 180);
        const dLon = (lon - userPosition.userLng) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(userPosition.userLat * Math.PI / 180) *
            Math.cos(lat * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(R * c);
    }

    let [markPosition, setMarkPosition] = useState({
        markLat: 0,
        markLng: 0
    })

    let [distance, setDistance] = useState(99999);

    let [marker, setMarker] = useState();
    let [map, setMap] = useState();

    useEffect(() => {
        getAttendanceSetting();

        const mapDiv = document.getElementById('map');

        const options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
        }
        setMap(new kakao.maps.Map(mapDiv, options));

    }, []);

    useEffect(() => {
        if(map != null){
            setMarker(new window.kakao.maps.Marker({
                map
            }));
        }
    }, [map]);

    useEffect(() => {

        if(marker != null && markPosition.markLat !== 0 && markPosition.markLng !== 0){
            marker.setPosition(new window.kakao.maps.LatLng(markPosition.markLat, markPosition.markLng));

            if(loginInfo.isAuthenticated){
                const coords = new kakao.maps.LatLng(markPosition.markLat, markPosition.markLng);
                map.setCenter(coords);
            }
        }
    }, [marker, markPosition]);

    useEffect(() => {
        props.distanceInfo.setDistance(distance);

    }, [distance]);
    
    useEffect(() => {

        if(marker != null && map != null){

            window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {

                if(loginInfo.role !== 'ROLE_USER'){
                    const latlng = mouseEvent.latLng;

                    marker.setPosition(latlng);

                    const latitude = latlng.getLat();
                    const longitude = latlng.getLng();

                    setMarkPosition({
                        markLat: latitude,
                        markLng: longitude
                    })
                    savePosition(latitude, longitude);
                }
            });
        }
    }, [marker, map])

    const openPostSearch = () => {

        if(loginInfo.isAuthenticated && loginInfo.role !== 'ROLE_USER'){
            new window.daum.Postcode({
                oncomplete: function (data) {

                    const address = data.address; // 선택한 도로명 주소

                    const kakao = window.kakao;
                    const geocoder = new kakao.maps.services.Geocoder();

                    geocoder.addressSearch(address, function (result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                            map.setCenter(coords);

                            if (marker) {
                                marker.setMap(null);
                            }

                            // 새 마커 생성
                            marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                            });

                            savePosition(result[0].y, result[0].x);
                        } else {
                            alert("주소 검색 실패했습니다.");
                        }
                    });
                },
            }).open();
        }
    }

    const savePosition = (latitude, longitude) => {
        axios.put('/api/admin/setting/position',{
            latitude: latitude,
            longitude: longitude
        },{
            headers: {
                Authorization: 'Bearer ' + loginInfo.token
            }
        }).then((response) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div style={{'width': 100+'%', 'height': 100+'%'}} className='flex flex-col'>
            <div id='map' style={{'width': 100+'%', 'height': 100+'%'}}>
            </div>
            {
                loginInfo.isAuthenticated && loginInfo.role !== 'ROLE_USER' ?
                    <button
                        className="btn mx-auto my-3"
                        onClick={openPostSearch}
                    >
                        주소 검색
                    </button> : <></>
            }
        </div>
    )
}

export default KakaoMap;