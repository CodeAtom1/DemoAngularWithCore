using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DemoAngularWithCore.Model;

namespace DemoAngularWithCore.Repository
{
  public class EventRepository
  {
    MongoClient client = null;
    IMongoDatabase db = null;
    string conStr = "mongodb://localhost:27017";
    string dbName = "local";
    public EventRepository()
    {
      client = new MongoClient(conStr);
      db = client.GetDatabase(dbName);
    }
    public List<Event> GetAllEvents()
    {
      var evCol = db.GetCollection<Event>("DemoEvents");
      return evCol.AsQueryable<Event>().ToList();
    }
    public Event GetEventsById(int id)
    {
      var evCol = db.GetCollection<Event>("DemoEvents");
      return evCol.AsQueryable<Event>().Where(e => e.id == id).FirstOrDefault();
    }
    public IEnumerable<Session> GetSessionsByName(string searchTerm)
    {
      List<Session> result = new List<Session>();
      var evCol = db.GetCollection<Event>("DemoEvents");
      string msg = "";
      //new Task(() =>
      Task ev = evCol.AsQueryable<Event>().ForEachAsync(async (evt) =>
      {
        try
        {
          var a = evt.sessions.AsEnumerable();
          var found = a.Where(s => s.name.ToUpper().Contains(searchTerm.ToUpper())).ToList();
          result.AddRange(found);
        }
        catch (Exception ex)
        {
          msg = ex.Message;
        }

      });
      while (!ev.IsCompleted) { }
      ev.Wait();
      //.RunSynchronously();
      // ev.RunSynchronously();//.Wait();
      return result;
    }
    public int CreateEvent(Event evtNew)
    {
      int id;
      var col = db.GetCollection<Event>("DemoEvents");
      var evtList = col.AsQueryable().AsEnumerable();
      int cnt = evtList.Count(e => e.id == evtNew.id);
      if (cnt > 0)
      {
        Event ev = evtList.First(e => e.id == evtNew.id);
        id = ev.id;

        if (ev.sessions== null||ev.sessions.Length < evtNew.sessions.Length)
        {
          evtNew.Id = ev.Id;
          col.DeleteOne(e => e.id == evtNew.id);
          // Session[] arrNew = new Session[evtNew.sessions.Length];
          col.InsertOne(evtNew);          
          // col.Find(e => e.id == evtNew.id).First().sessions.CopyTo(arrNew, 0);//.FindOneAndReplace(e => e.id == evt.id).sessions.
          // arrNew[arrNew.Length - 1] = evtNew.sessions[evtNew.sessions.Length - 1];
        }
      }
      else
      {
        id = col.AsQueryable().Max(e => e.id);
        id = id + 1;
        evtNew.id = id;
        col.InsertOne(evtNew);
      }
      return id;
    }
  }
}
