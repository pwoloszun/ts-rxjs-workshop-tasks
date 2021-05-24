interface RealEstate {
  builtAt: string;
  id: number;
  lat: number;
  lng: number;
  price: number;
  street: string;
  type: string;
}

// TODO: RealEstatesService class
// url: 'http://localhost:4100/api/real-estates'

// TODO
function realEstatesServiceTask() {
  // const service = new RealEstatesService();
  // service.fetchData();
  //
  // let currAllEstates;
  // service.allRealEstates$.subscribe((realEstates: RealEstate[]) => {
  //   console.log('ALL real estates', realEstates);
  //   currAllEstates = realEstates;
  // });
  //
  // let currSelected;
  // service.selectedRealEstate$.subscribe((estate: RealEstate) => {
  //   console.log('SELECTED real estate', estate);
  //   currSelected = estate;
  // });
  //
  // service.selectedRealEstate$
  //   .subscribe(fullObserver('SELECTED real estate'));
  //
  // setTimeout(function () {
  //   service.toggleSelected(currAllEstates[1]);
  // }, 2000);
  //
  // setTimeout(function () {
  //   service.toggleSelected(currAllEstates[2]);
  // }, 4000);
  //
  // setTimeout(function () {
  //   service.toggleSelected(currAllEstates[2]);
  // }, 6000);
  //
  // setTimeout(function () {
  //   service.toggleSelected(currAllEstates[3]);
  // }, 8000);
}

export function realEstatesServiceTaskApp() {
  // realEstatesServiceTask();
}
