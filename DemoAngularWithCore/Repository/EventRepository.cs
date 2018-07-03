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

        if (ev.sessions == null || ev.sessions.Length < evtNew.sessions.Length)
        {
          evtNew.Id = ev.Id;//update to existing, so objectid will be same
          col.DeleteOne(e => e.id == evtNew.id);
          col.InsertOne(evtNew);
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

    public string UpdateVoters(int eventId, int sessionId, string voterName, bool IsAdd)
    {
      var col = db.GetCollection<Event>("DemoEvents");
      var evtList = col.AsQueryable().AsEnumerable();
      int cnt = evtList.Count(e => e.id == eventId);
      if (cnt > 0)
      {
        Event ev = evtList.First(e => e.id == eventId);

        if (ev.sessions == null || ev.sessions.Length > 0)
        {
          IEnumerable<Session> sessions = ev.sessions.AsEnumerable();
          sessions = sessions.Select(s =>
          {
            if (s.id == sessionId)
            {
              if (IsAdd)
              {
                var list = s.voters.ToList();
                list.Add(voterName);
                s.voters = list.ToArray();
              }
              else
                s.voters = s.voters.Where(val => val != voterName).ToArray();
            }
            return s;
          });
          col.FindOneAndUpdate(
            Builders<Event>.Filter.Eq(e => e.id, eventId) & Builders<Event>.Filter.Eq(e => e.id, eventId),
            Builders<Event>.Update.Set(e => e.sessions, sessions));
        }
      }
      return "Updated";
    }
  }
}
