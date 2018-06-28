using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver.Linq;
using MongoDB.Bson.Serialization.Attributes;
using DemoAngularWithCore.Repository;
using DemoAngularWithCore.Model;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System.Text;

namespace DemoAngularWithCore.Controllers
{
  [Route("/api/[Controller]")]
  public class ApiController : Controller
  {
    EventRepository repo;

    [HttpGet("/api/events")]
    public string Get()
    {
      repo = new EventRepository();
      var list = repo.GetAllEvents();
      return JsonConvert.SerializeObject(list);
    }
    [HttpGet("/api/events/{id}")]
    public string Get(int id)
    {
      repo = new EventRepository();
      var evt = repo.GetEventsById(id);
      if (evt.sessions == null) evt.sessions = new Session[0];
      return JsonConvert.SerializeObject(evt);
    }
    [HttpGet("/api/sessions/search")]
    public string Get(string searchvalue)
    {
      repo = new EventRepository();
      var evt = repo.GetSessionsByName(searchvalue);
      return JsonConvert.SerializeObject(evt);
    }

    [HttpPost]
    [Route("/api/events")]
    [AllowAnonymous]
    public IActionResult CreateEvent([FromBody]Event ev)
    {
      byte[] arrr = new byte[Request.Body.Length];
      Request.Body.Read(arrr, 0, Convert.ToInt32(Request.Body.Length));
      string data = System.Text.Encoding.UTF8.GetString(arrr);
      repo = new EventRepository();
      return Ok(repo.CreateEvent(ev));
    }
  }
}
