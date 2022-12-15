import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "./user.service";
import {ConnectionService} from "./connection.service";
import {Observable} from "rxjs";

describe('ConnectionService', () => {
  let service: ConnectionService;
  let httpClientSpy:HttpTestingController
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserService, ConnectionService]
    });

    service = TestBed.inject(ConnectionService);
    userService = TestBed.inject(UserService);
    httpClientSpy=TestBed.inject(HttpTestingController);

    userService.registerUser("TestUser1","20 August 2001",
      "Joyful","Male", "", "916345678",
      "Rua","TestUser1@gmail.com", "Rua12345", "Test")
      .subscribe(a => {});

    userService.registerUser("TestUser2","29 August 2001",
      "Joyful","Male", "", "912345678",
      "Rua","TestUser2@gmail.com", "Rua12345", "Test")
      .subscribe(a => {});

    httpClientSpy.match(userService.Url + "/registerUser");
  });

  it("should create the connection", () =>{

    //Subscribe user 1 and get id
    userService.getByKeyWord("TestUser1").subscribe( data => {
      let testUser1Id = data[0].Id;
      expect(data.userName.username).toBe("TestUser1");
      expect(data.description.desc).toBe("");
      httpClientSpy.match(userService.Url + "/keyword/TestUser1");

      //Subscribe user 2 and get id
      userService.getByKeyWord("TestUser2").subscribe( data2 => {
        let testUser2Id = data2[0].Id;
        expect(data.userName.username).toBe("TestUser2");
        expect(data.description.desc).toBe("");
        httpClientSpy.match(userService.Url + "/keyword/TestUser2");

        service.addConnection("TestUser1", "TestUser2");

        const request=httpClientSpy.expectOne(service.Url + '/addConnectionFromNames');
        expect(request.request.method).toBe('POST');
        request.flush(data);
        request.flush(data2);

    });

    });
  });

  it("should create the request", () =>{

    //Subscribe user 1 and get id
    userService.getByKeyWord("TestUser1").subscribe( data => {
      let testUser1Id = data[0].Id;
      expect(data.userName.username).toBe("TestUser1");
      expect(data.description.desc).toBe("");
      httpClientSpy.match(userService.Url + "/keyword/TestUser1");

      //Subscribe user 2 and get id
      userService.getByKeyWord("TestUser2").subscribe( data2 => {
        let testUser2Id = data2[0].Id;
        expect(data.userName.username).toBe("TestUser2");
        expect(data.description.desc).toBe("");
        httpClientSpy.match(userService.Url + "/keyword/TestUser2");

        service.addConnection("TestUser1", "TestUser2");
        const request=httpClientSpy.expectOne(service.Url + '/addConnectionFromNames');
        expect(request.request.method).toBe('POST');
        request.flush(data);
        request.flush(data2);

        service.getAll().subscribe(data3 => {
          expect(data3.length.toBe(1));
          expect(request.request.method).toBe('GET')
          request.flush(data3);
        })

      });

    });
  });

});
