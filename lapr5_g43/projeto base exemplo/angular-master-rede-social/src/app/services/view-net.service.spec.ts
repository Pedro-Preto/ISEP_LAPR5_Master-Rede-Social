import { TestBed } from '@angular/core/testing';

import { ViewNetService } from './view-net.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "./user.service";
import {ConnectionService} from "./connection.service";

describe('ViewNetService', () => {
  let userService: UserService;
  let connectionService: ConnectionService;
  let service: ViewNetService;
  let httpClientSpy: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ViewNetService, UserService, ConnectionService]
    });
    connectionService = TestBed.inject(ConnectionService);
    userService = TestBed.inject(UserService);
    service = TestBed.inject(ViewNetService);
    httpClientSpy = TestBed.inject(HttpTestingController);

    userService.registerUser("TestUser1","29 August 2001",
      "Joyful","Male", "", "912345678",
      "Rua","TestUser1@gmail.com", "Rua12345", "Test")
      .subscribe(a => {});

    userService.registerUser("TestUser2","29 August 2001",
      "Joyful","Male", "", "912345678",
      "Rua","TestUser2@gmail.com", "Rua12345", "Test")
      .subscribe(a => {});

    userService.registerUser("TestUser3","29 August 2001",
      "Joyful","Male", "", "912345678",
      "Rua","TestUser3@gmail.com", "Rua12345", "Test")
      .subscribe(a => {});

    connectionService.addConnection("TestUser1", "TestUser2");
    connectionService.addConnection("TestUser2", "TestUser3");

    httpClientSpy.match(userService.Url + "/registerUser");
    httpClientSpy.match(connectionService.Url + "/addConnectionFromNames");

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return the users directly connected to the user selected", () =>{
    userService.getByKeyWord("TestUser1").subscribe( data => {
      let testUser1Id = data[0].Id;
      console.log(testUser1Id);

      httpClientSpy.match(userService.Url + "/keyword/TestUser1");

      service.viewNetOfUserUpToLevel(testUser1Id, 1).subscribe(data2 => {
        expect(data2.length).toBe(2);

        httpClientSpy.match(service.Url + '/viewNet/' +testUser1Id +'/' +1);

      });
    });
  });

  it("should return the users two levels connected to the user selected", () =>{
    userService.getByKeyWord("TestUser1").subscribe( data => {
      let testUser1Id = data[0].Id;
      console.log(testUser1Id);

      httpClientSpy.match(userService.Url + "/keyword/TestUser1");

      service.viewNetOfUserUpToLevel(testUser1Id, 2).subscribe(data2 => {
        expect(data2.length).toBe(3);

        httpClientSpy.match(service.Url + '/viewNet/' +testUser1Id +'/' +1);

      });
    });
  });

});
