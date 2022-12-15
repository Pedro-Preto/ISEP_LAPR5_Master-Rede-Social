import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[UserService]
    });
    service=TestBed.inject(UserService);
    httpClientSpy=TestBed.inject(HttpTestingController);
    service.registerUser(  "Marta","29 August 2001", "Joyful" ,"Male",   "", "912345678" , "Rua Camelias","sim@gmail.com", "Rua12345", "Teste").subscribe(data=>{

    })
    const request=httpClientSpy.expectOne(service.Url+"/registerUser");
    expect(request.request.method).toBe('POST');
  });

  afterEach(() => {
  httpClientSpy.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return the user with username Test", () =>{
    service.getByKeyWord("Marta").subscribe(data=>{
      expect(data[0].userName.username).toBe("Marta");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/keyword/Marta");
    expect(request.request.method).toBe('GET');
  });


  it("should return the all Users", () =>{
    const body=[{"id": "67c3db7d-eb08-42e0-8dff-e47d87535720", "userName": {"username": "Joana"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:31:37.2830611"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "7f71d8e5-51d6-4264-92c7-9ea785a73f7e"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}, {"id": "9136f206-cb93-41bf-b868-46c761533957", "userName": {"username": "PP"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 7, "date": "2021-12-17T19:39:40.9664029"}, "gender": {"genderAtri": 0}, "description": {"desc": "Quase natal"}, "systemUserId": {"value": "9f6689b5-48fd-4ed8-8cb9-5f0261d04683"}, "phoneNumber": {"number": "912345678"}, "address": {"addr": "Rua de So joao"}, "tags": [{"tagIdValue": "Futebol"}]}, {"id": "92406248-3fa8-480c-87a2-6a048ab8a356", "userName": {"username": "Gabriel"}, "birthday": {"birthday": "2001-06-21T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:53:53.8144041"}, "gender": {"genderAtri": 0}, "description": {"desc": ""}, "systemUserId": {"value": "bd14faf8-9891-4b78-8385-f54a2bcdb158"}, "phoneNumber": {"number": "938987898"}, "address": {"addr": "Rua Rya"}, "tags": [{"tagIdValue": "Facas"}]}, {"id": "ab1529f3-fad5-4962-9dd3-f8d4910692b9", "userName": {"username": "Marta"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:31:05.1368268"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "88563c45-e8ba-45d6-807d-8310b28e127c"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}, {"id": "ebf47b4b-00d6-4331-870a-7cf2b8b3e8af", "userName": {"username": "Pereira"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:30:37.6366136"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "3be4f59f-38d9-4974-ab46-ee9422d00886"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}];
    service.getUsers().subscribe(data=>{
      expect(data).toBe(body);
    });
    const request=httpClientSpy.expectOne(service.Url+"/getAll");
    expect(request.request.method).toBe('GET');
    request.flush(body);

  });

  it("should return the user with id Test", () =>{
    service.getUser("ab1529f3-fad5-4962-9dd3-f8d4910692b9").subscribe(data=>{
      expect(data.userName.username).toBe("Marta");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/id/ab1529f3-fad5-4962-9dd3-f8d4910692b9");
    expect(request.request.method).toBe('GET');
  });


  it("should return the other user Test", () =>{
    service.getOtherUsers("ab1529f3-fad5-4962-9dd3-f8d4910692b9").subscribe(data=>{
      expect(data.userName.username).toBe("Marta");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/getOther/ab1529f3-fad5-4962-9dd3-f8d4910692b9");
    expect(request.request.method).toBe('GET');
  });

  it("should return the user with profile edited Test", () =>{
    service.editProfile("Pedro","Heyy","","","","","ab1529f3-fad5-4962-9dd3-f8d4910692b9").subscribe(data=>{
      expect(data.userName.username).toBe("Pedro");
      expect(data.description.desc).toBe("Hey");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/editProfile/id/ab1529f3-fad5-4962-9dd3-f8d4910692b9");
    expect(request.request.method).toBe('PUT');
  });


  it("should return the user with changed emotionalState Test", () =>{
    service.updateEmotionalState("ab1529f3-fad5-4962-9dd3-f8d4910692b9","Distressed").subscribe(data=>{
      expect(data.emotionalState.emotionalStateAtri).toBe("Distressed");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/emotionalState/ab1529f3-fad5-4962-9dd3-f8d4910692b9");
    expect(request.request.method).toBe('PUT');
  });


  it("should register a new user user Test", () =>{
    service.registerUser(  "Test","29 August 2001", "Joyful" ,"Male",   "",
      "912345678" , "Rua Camelias","teste@gmail.com", "Rua12345", "Teste").subscribe(data=>{
    expect(data.UserName.username).toBe("Test");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/registerUser");
    expect(request.request.method).toBe('POST');
  });

  it("should login a user Test", () =>{
    service.login("3@gmail.com","12345").subscribe(data=>{
      expect(data.email.emailAtri).toBe("3@gmail.com");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/login");
    expect(request.request.method).toBe('PUT');
  });

  it("should logout a user Test", () =>{
    service.logout("ab1529f3-fad5-4962-9dd3-f8d4910692b9").subscribe(data=>{
      expect(data.email.emailAtri).toBe("3@gmail.com");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/logout/");
    expect(request.request.method).toBe('PUT');
  });

  it("should return the user with email Test", () =>{
    service.getIdByEmail("3@gmail.com").subscribe(data=>{
      expect(data.id).toBe("ab1529f3-fad5-4962-9dd3-f8d4910692b9");
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/idByEmail/3@gmail.com");
    expect(request.request.method).toBe('GET');
  });

  it("should return the user net level Test", () =>{
   const body=[{"id": "ab1529f3-fad5-4962-9dd3-f8d4910692b9", "userName": {"username": "Marta"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2,"date": "2021-12-16T10:31:05.1368268"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "88563c45-e8ba-45d6-807d-8310b28e127c"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}, {"id": "9136f206-cb93-41bf-b868-46c761533957", "userName": {"username": "PP"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 7, "date": "2021-12-17T19:39:40.9664029"}, "gender": {"genderAtri": 0}, "description": {"desc": "Quase natal"}, "systemUserId": {"value": "9f6689b5-48fd-4ed8-8cb9-5f0261d04683"}, "phoneNumber": {"number": "912345678"}, "address": {"addr": "Rua de So joao"}, "tags": [{"tagIdValue": "Futebol"}]}, {"id": "92406248-3fa8-480c-87a2-6a048ab8a356", "userName": {"username": "Gabriel"}, "birthday": {"birthday": "2001-06-21T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:53:53.8144041"}, "gender": {"genderAtri": 0}, "description": {"desc": ""}, "systemUserId": {"value": "bd14faf8-9891-4b78-8385-f54a2bcdb158"}, "phoneNumber": {"number": "938987898"}, "address": {"addr": "Rua Rya"}, "tags": [{"tagIdValue": "Facas"}]}, {"id": "67c3db7d-eb08-42e0-8dff-e47d87535720", "userName": {"username": "Joana"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:31:37.2830611"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "7f71d8e5-51d6-4264-92c7-9ea785a73f7e"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}];
   service.getNetOfUserUpToLevel("ab1529f3-fad5-4962-9dd3-f8d4910692b9",1).subscribe(data=>{
      expect(data).toBe(body);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.netUrl+"/viewNet/ab1529f3-fad5-4962-9dd3-f8d4910692b9/1");
    expect(request.request.method).toBe('GET');
  });

  it("should return the user friends Test", () =>{
    const body=[{"id": "ab1529f3-fad5-4962-9dd3-f8d4910692b9", "userName": {"username": "Marta"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2,"date": "2021-12-16T10:31:05.1368268"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "88563c45-e8ba-45d6-807d-8310b28e127c"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}, {"id": "9136f206-cb93-41bf-b868-46c761533957", "userName": {"username": "PP"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 7, "date": "2021-12-17T19:39:40.9664029"}, "gender": {"genderAtri": 0}, "description": {"desc": "Quase natal"}, "systemUserId": {"value": "9f6689b5-48fd-4ed8-8cb9-5f0261d04683"}, "phoneNumber": {"number": "912345678"}, "address": {"addr": "Rua de So joao"}, "tags": [{"tagIdValue": "Futebol"}]}, {"id": "92406248-3fa8-480c-87a2-6a048ab8a356", "userName": {"username": "Gabriel"}, "birthday": {"birthday": "2001-06-21T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:53:53.8144041"}, "gender": {"genderAtri": 0}, "description": {"desc": ""}, "systemUserId": {"value": "bd14faf8-9891-4b78-8385-f54a2bcdb158"}, "phoneNumber": {"number": "938987898"}, "address": {"addr": "Rua Rya"}, "tags": [{"tagIdValue": "Facas"}]}, {"id": "67c3db7d-eb08-42e0-8dff-e47d87535720", "userName": {"username": "Joana"}, "birthday": {"birthday": "2001-06-23T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:31:37.2830611"}, "gender": {"genderAtri": 1}, "description": {"desc": "Pofessor"}, "systemUserId": {"value": "7f71d8e5-51d6-4264-92c7-9ea785a73f7e"}, "phoneNumber": {"number": "932345678"}, "address": {"addr": "Rua"}, "tags": [{"tagIdValue": "Tenis"}, {"tagIdValue": "Futebol"}]}];
    service.getUserFriends("Marta").subscribe(data=>{
      expect(data).toBe(body);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/GetFriends/Marta");
    expect(request.request.method).toBe('GET');
  });

  it("should return Total First Level Connection Strength", () =>{
    service.getTotalFirstLevelConnectionStrength("ab1529f3-fad5-4962-9dd3-f8d4910692b9").subscribe(data=>{
      expect(data).toBe(24);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/GetTotalFirstLevelConnectionStrength/ab1529f3-fad5-4962-9dd3-f8d4910692b9");
    expect(request.request.method).toBe('GET');
  });

  /*it("should return Tag cloud all connections Test", () =>{
    const tags=["Amigos", "Gatos", "Friends"]
    service.getTagCloudAllUsers("Amigos,Gatos").subscribe(data=>{
      expect(data).toBe(tags);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/tagCloud/AllUsers");
    expect(request.request.method).toBe('GET');
  });

  it("should return my Tag cloud ", () =>{
    const tags=["Gatos"]
    service.getMyTagCloud("gatos,caes").subscribe(data=>{
      expect(data).toBe(tags);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/tagCloud/Me/ab1529f3-fad5-4962-9dd3-f8d4910692b9");
    expect(request.request.method).toBe('GET');
  });*/

  it("should return common friends Test ", () =>{
    const friends=[{"id": "92406248-3fa8-480c-87a2-6a048ab8a356", "userName": {"username": "Gabriel"}, "birthday": {"birthday": "2001-06-21T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:53:53.8144041"}, "gender": {"genderAtri": 0}, "description": {"desc": ""}, "systemUserId": {"value": "bd14faf8-9891-4b78-8385-f54a2bcdb158"}, "phoneNumber": {"number": "938987898"}, "address": {"addr": "Rua Rya"}, "tags": [{"tagIdValue": "Facas"}]}, {"id": "92406248-3fa8-480c-87a2-6a048ab8a356", "userName": {"username": "Gabriel"}, "birthday": {"birthday": "2001-06-21T00:00:00"}, "emotionalState": {"emotionalStateAtri": 2, "date": "2021-12-16T10:53:53.8144041"}, "gender": {"genderAtri": 0}, "description": {"desc": ""}, "systemUserId": {"value": "bd14faf8-9891-4b78-8385-f54a2bcdb158"}, "phoneNumber": {"number": "938987898"}, "address": {"addr": "Rua Rya"}, "tags": [{"tagIdValue": "Facas"}]}]
    service.getUsersCommonFriends("Marta","PP").subscribe(data=>{
      expect(data).toBe(friends);
      request.flush(data);
    });
    const request=httpClientSpy.expectOne(service.Url+"/GetCommonFriends/Marta/PP");
    expect(request.request.method).toBe('GET');
  });


});
