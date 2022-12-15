import { TestBed } from '@angular/core/testing';

import { IntroductionRequestService } from './introduction-request.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "./user.service";
import {ConnectionService} from "./connection.service";

describe('IntroductionRequestService', () => {
  let service: IntroductionRequestService;
  let connectionService: ConnectionService;
  let httpClientSpy:HttpTestingController
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[IntroductionRequestService, UserService, ConnectionService]
    });
    service = TestBed.inject(IntroductionRequestService);
    connectionService = TestBed.inject(ConnectionService);
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

    userService.registerUser("TestUser3","14 August 2002",
      "Joyful","Male", "", "911345678",
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

    //Subscribe user 3 and get id
    userService.getByKeyWord("TestUser3").subscribe( data3 => {
      let testUser3Id = data3[0].Id;
      expect(data.userName.username).toBe("TestUser3");
      expect(data.description.desc).toBe("");

      httpClientSpy.match(userService.Url + "/keyword/TestUser3");

      service.makeIntroductionRequest(data[0].Id, data2[0].Id,data3[0].Id, "Test message1", "Test message 2", "7", "TestTag").subscribe(data4 => {

        const request=httpClientSpy.expectOne('http://localhost:4200/make-introduction-request-page');
        expect(request.request.method).toBe('POST');
        request.flush(data);
        request.flush(data2);
        request.flush(data3);

      });

      });
      });
    });
  });

});
