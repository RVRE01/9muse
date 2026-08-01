export const otherVehicleOption = 'Other / Not Listed';

export const vehicleCatalog = {
  'Acura': ['Integra', 'NSX', 'TLX', 'MDX', otherVehicleOption],
  'Alfa Romeo': ['Giulia', 'Stelvio', '4C', otherVehicleOption],
  'Aston Martin': ['Vantage', 'DB11', 'DB12', 'DBS', 'DBX', otherVehicleOption],
  'Audi': ['RS 3', 'RS 5', 'RS 6', 'RS 7', 'R8', 'S8', 'SQ8', otherVehicleOption],
  'Bentley': ['Continental GT', 'Flying Spur', 'Bentayga', otherVehicleOption],
  'BMW': ['M2', 'M3', 'M4', 'M5', 'M8', 'X3 M', 'X5 M', 'XM', otherVehicleOption],
  'Cadillac': ['CT4-V', 'CT5-V', 'Escalade', otherVehicleOption],
  'Chevrolet': ['Camaro', 'Corvette', 'Tahoe', 'Suburban', otherVehicleOption],
  'Dodge': ['Challenger', 'Charger', 'Durango', 'Viper', otherVehicleOption],
  'Ferrari': ['296', '458', '488', '812', 'F8', 'Purosangue', 'Roma', 'SF90', otherVehicleOption],
  'Ford': ['Bronco', 'F-150', 'GT', 'Mustang', otherVehicleOption],
  'Genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80', otherVehicleOption],
  'Jaguar': ['F-Pace', 'F-Type', 'XE', 'XF', otherVehicleOption],
  'Lamborghini': ['Aventador', 'Huracan', 'Revuelto', 'Urus', otherVehicleOption],
  'Land Rover': ['Defender', 'Discovery', 'Range Rover', 'Range Rover Sport', otherVehicleOption],
  'Lexus': ['LC', 'LFA', 'IS', 'RC', 'RX', 'GX', 'LX', otherVehicleOption],
  'Maserati': ['GranTurismo', 'Grecale', 'Levante', 'MC20', otherVehicleOption],
  'McLaren': ['570S', '600LT', '720S', '750S', 'Artura', 'GT', otherVehicleOption],
  'Mercedes-AMG': ['AMG GT', 'C 63', 'E 63', 'G 63', 'GLE 63', 'S 63', 'SL 63', otherVehicleOption],
  'Nissan': ['GT-R', 'Z', otherVehicleOption],
  'Porsche': ['718', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', otherVehicleOption],
  'Rivian': ['R1S', 'R1T', otherVehicleOption],
  'Rolls-Royce': ['Cullinan', 'Dawn', 'Ghost', 'Phantom', 'Spectre', 'Wraith', otherVehicleOption],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck', otherVehicleOption],
  'Toyota': ['GR Corolla', 'GR Supra', 'Land Cruiser', 'Sequoia', otherVehicleOption],
  'Volkswagen': ['Golf R', 'GTI', 'Touareg', otherVehicleOption],
  'Motorcycle': ['Cruiser', 'Sport', 'Touring', 'Adventure', 'Custom / Other', otherVehicleOption],
  'Specialty Cabin': ['Aviation cabin', 'Marine cabin', 'Other specialty interior', otherVehicleOption],
  [otherVehicleOption]: [otherVehicleOption],
} as const;

export type VehicleMake = keyof typeof vehicleCatalog;

export const vehicleMakes = Object.keys(vehicleCatalog) as VehicleMake[];

export const getVehicleModels = (make: string): readonly string[] =>
  make in vehicleCatalog
    ? vehicleCatalog[make as VehicleMake]
    : [otherVehicleOption];

export const vehicleYears = [
  ...Array.from(
    { length: new Date().getFullYear() + 2 - 1980 },
    (_, index) => String(new Date().getFullYear() + 1 - index),
  ),
  'Pre-1980 / Classic',
] as const;

