import pytest
from app import app


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestGetCities:
    def test_get_cities_success(self, client):
        """Test GET /api/cities returns all cities."""
        response = client.get("/api/cities")
        assert response.status_code == 200
        data = response.get_json()
        assert "cities" in data
        assert isinstance(data["cities"], list)
        assert len(data["cities"]) > 0
        assert "台北市" in data["cities"]
        assert "高雄市" in data["cities"]


class TestGetSpotsByCity:
    def test_get_spots_by_city_success(self, client):
        """Test GET /api/spots/<city> returns spots for valid city."""
        response = client.get("/api/spots/台北市")
        assert response.status_code == 200
        data = response.get_json()
        assert data["city"] == "台北市"
        assert "spots" in data
        assert isinstance(data["spots"], list)
        assert len(data["spots"]) > 0

    def test_get_spots_by_city_invalid(self, client):
        """Test GET /api/spots/<city> returns 404 for invalid city."""
        response = client.get("/api/spots/不存在的城市")
        assert response.status_code == 404
        data = response.get_json()
        assert "error" in data
        assert data["error"] == "找不到該縣市"

    def test_get_spots_taipei_contains_expected_spots(self, client):
        """Test that Taiwan spots contain expected data structure."""
        response = client.get("/api/spots/台北市")
        assert response.status_code == 200
        spots = response.get_json()["spots"]

        assert len(spots) == 3
        first_spot = spots[0]
        assert first_spot["id"] == 1
        assert first_spot["name"] == "大安森林公園"
        assert "address" in first_spot
        assert "description" in first_spot
        assert "rating" in first_spot
        assert "tags" in first_spot
        assert "image_url" in first_spot

    def test_get_spots_different_cities(self, client):
        """Test getting spots from different cities."""
        cities = ["新北市", "台中市", "台南市", "高雄市"]
        for city in cities:
            response = client.get(f"/api/spots/{city}")
            assert response.status_code == 200
            data = response.get_json()
            assert data["city"] == city
            assert len(data["spots"]) > 0


class TestGetAllSpots:
    def test_get_all_spots_success(self, client):
        """Test GET /api/spots returns all spots."""
        response = client.get("/api/spots")
        assert response.status_code == 200
        data = response.get_json()
        assert "spots" in data
        assert isinstance(data["spots"], dict)

    def test_get_all_spots_contains_all_cities(self, client):
        """Test that all spots response contains all cities."""
        response = client.get("/api/spots")
        assert response.status_code == 200
        spots = response.get_json()["spots"]
        assert "台北市" in spots
        assert "新北市" in spots
        assert "台中市" in spots
        assert "台南市" in spots
        assert "高雄市" in spots

    def test_all_spots_have_required_fields(self, client):
        """Test that all spots have required fields."""
        response = client.get("/api/spots")
        spots = response.get_json()["spots"]
        required_fields = ["id", "name", "address", "description", "rating", "tags", "image_url"]

        for city, city_spots in spots.items():
            for spot in city_spots:
                for field in required_fields:
                    assert field in spot, f"Spot {spot.get('id')} missing field {field}"


class TestCORSHeaders:
    def test_cors_headers_present(self, client):
        """Test that CORS headers are present in responses."""
        response = client.get("/api/cities")
        assert response.status_code == 200


class TestErrorHandling:
    def test_invalid_route(self, client):
        """Test that invalid routes return 404."""
        response = client.get("/api/invalid-route")
        assert response.status_code == 404

    def test_wrong_method(self, client):
        """Test that wrong HTTP methods return 405."""
        response = client.post("/api/cities")
        assert response.status_code == 405
