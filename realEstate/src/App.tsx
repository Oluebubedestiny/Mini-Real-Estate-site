import React, { useState } from "react";
import {
  ChevronLeft,
  Building2,
  Users,
  Maximize,
  Bed,
  Car,
  Home,
} from "lucide-react";

interface Tower {
  id: string;
  name: string;
  description: string;
  totalFloors: number;
  image: string;
}

interface Floor {
  id: string;
  number: number;
  available: number;
  total: number;
}

interface Apartment {
  id: string;
  name: string;
  area: number;
  unitType: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  price: number;
  image: string;
  features: string[];
}

const towers: Tower[] = [
  {
    id: "tower-a",
    name: "Tower A - Skyline",
    description: "Premium residences with panoramic city views",
    totalFloors: 15,
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: "tower-b",
    name: "Tower B - Vista",
    description: "Modern apartments with garden views",
    totalFloors: 12,
    image:
      "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
  {
    id: "tower-c",
    name: "Tower C - Heights",
    description: "Luxury penthouses and exclusive suites",
    totalFloors: 18,
    image:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
  },
];

const generateFloors = (totalFloors: number): Floor[] => {
  return Array.from({ length: totalFloors }, (_, i) => ({
    id: `floor-${i + 1}`,
    number: i + 1,
    available: Math.floor(Math.random() * 4) + 1,
    total: 4,
  }));
};

const generateApartments = (floorNumber: number): Apartment[] => {
  const apartments: Apartment[] = [
    {
      id: `apt-${floorNumber}-1`,
      name: `Unit ${floorNumber}01`,
      area: 1200,
      unitType: "2BHK",
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      price: 850000,
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      features: ["Balcony", "City View", "Modern Kitchen"],
    },
    {
      id: `apt-${floorNumber}-2`,
      name: `Unit ${floorNumber}02`,
      area: 1500,
      unitType: "3BHK",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      price: 1200000,
      image:
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      features: ["Corner Unit", "Garden View", "Walk-in Closet"],
    },
    {
      id: `apt-${floorNumber}-3`,
      name: `Unit ${floorNumber}03`,
      area: 900,
      unitType: "1BHK",
      bedrooms: 1,
      bathrooms: 1,
      parking: 1,
      price: 650000,
      image:
        "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      features: ["Compact Living", "East Facing", "Premium Finishes"],
    },
    {
      id: `apt-${floorNumber}-4`,
      name: `Unit ${floorNumber}04`,
      area: 1800,
      unitType: "4BHK",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      price: 1500000,
      image:
        "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
      features: ["Penthouse Style", "Panoramic Views", "Private Terrace"],
    },
  ];

  return apartments.slice(0, Math.floor(Math.random() * 2) + 3);
};

type ViewType = "towers" | "floors" | "apartments" | "detail";

interface AppState {
  view: ViewType;
  selectedTower: Tower | null;
  selectedFloor: Floor | null;
  selectedApartment: Apartment | null;
  floors: Floor[];
  apartments: Apartment[];
}

function App() {
  const [state, setState] = useState<AppState>({
    view: "towers",
    selectedTower: null,
    selectedFloor: null,
    selectedApartment: null,
    floors: [],
    apartments: [],
  });

  const selectTower = (tower: Tower) => {
    const floors = generateFloors(tower.totalFloors);
    setState({
      ...state,
      view: "floors",
      selectedTower: tower,
      floors,
    });
  };

  const selectFloor = (floor: Floor) => {
    const apartments = generateApartments(floor.number);
    setState({
      ...state,
      view: "apartments",
      selectedFloor: floor,
      apartments,
    });
  };

  const selectApartment = (apartment: Apartment) => {
    setState({
      ...state,
      view: "detail",
      selectedApartment: apartment,
    });
  };

  const goBack = () => {
    switch (state.view) {
      case "floors":
        setState({ ...state, view: "towers", selectedTower: null });
        break;
      case "apartments":
        setState({ ...state, view: "floors", selectedFloor: null });
        break;
      case "detail":
        setState({ ...state, view: "apartments", selectedApartment: null });
        break;
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    if (state.selectedTower) {
      breadcrumbs.push(state.selectedTower.name);
    }
    if (state.selectedFloor) {
      breadcrumbs.push(`Floor ${state.selectedFloor.number}`);
    }
    if (state.selectedApartment) {
      breadcrumbs.push(state.selectedApartment.name);
    }
    return breadcrumbs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {state.view !== "towers" && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-blue-600 hover:text-blue-700"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {state.view === "towers"
                ? "Select Tower"
                : state.view === "floors"
                ? "Select Floor"
                : state.view === "apartments"
                ? "Select Apartment"
                : "Apartment Details"}
            </h1>
          </div>

          {getBreadcrumbs().length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Home className="w-4 h-4" />
              {getBreadcrumbs().map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <span className="font-medium">{crumb}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Towers View */}
        {state.view === "towers" && (
          <div className="grid md:grid-cols-3 gap-8">
            {towers.map((tower) => (
              <div
                key={tower.id}
                onClick={() => selectTower(tower)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={tower.image}
                      alt={tower.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {tower.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{tower.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {tower.totalFloors} Floors
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floors View */}
        {state.view === "floors" && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {state.floors.map((floor) => (
              <div
                key={floor.id}
                onClick={() => selectFloor(floor)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-transparent hover:border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {floor.number}
                    </div>
                    <div className="text-sm text-gray-500 mb-3">Floor</div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">
                        {floor.available} Available
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      of {floor.total} units
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apartments View */}
        {state.view === "apartments" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {state.apartments.map((apartment) => (
              <div
                key={apartment.id}
                onClick={() => selectApartment(apartment)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img
                      src={apartment.image}
                      alt={apartment.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {apartment.unitType}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {apartment.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        {apartment.area} sq ft
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {apartment.bedrooms}BR
                      </span>
                    </div>
                    <div className="text-xl font-bold text-blue-600 mb-3">
                      ${apartment.price.toLocaleString()}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {apartment.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apartment Detail View */}
        {state.view === "detail" && state.selectedApartment && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative">
                <img
                  src={state.selectedApartment.image}
                  alt={state.selectedApartment.name}
                  className="w-full h-96 lg:h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
                  {state.selectedApartment.unitType}
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {state.selectedApartment.name}
                </h2>
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  ${state.selectedApartment.price.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Maximize className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {state.selectedApartment.area}
                    </div>
                    <div className="text-sm text-gray-600">Square Feet</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {state.selectedApartment.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {state.selectedApartment.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Car className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {state.selectedApartment.parking}
                    </div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.selectedApartment.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Schedule Tour
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
