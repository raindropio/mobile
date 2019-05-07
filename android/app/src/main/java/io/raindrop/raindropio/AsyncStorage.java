package io.raindrop.raindropio;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import org.json.JSONObject;
import java.util.ArrayList;

public class AsyncStorage {

    public static String TAG = "RNAsyncStorage";
    public ReactApplicationContext context;
    public ArrayList<JSONObject> collection;
    public JSONObject data;
    public JSONObject app;

    Cursor catalystLocalStorage = null;
    SQLiteDatabase readableDatabase = null;

    public AsyncStorage (ReactApplicationContext context) {
        this.context = context;
        this.collection = new ArrayList<JSONObject>();
        this.fetch();
    }

    public void fetch() {
        try {
            readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();
            catalystLocalStorage = readableDatabase.query("catalystLocalStorage", new String[]{"key", "value"}, null, null, null, null, null);

            if (catalystLocalStorage.moveToFirst()) {
                do {
                    try {
                        // one row with all AsyncStorage: { "app": { ... }, ... }
                        String json = catalystLocalStorage.getString(catalystLocalStorage.getColumnIndex("value"));
                        JSONObject obj = new JSONObject(json);

                        String app = obj.getString("app");

                        JSONObject res = new JSONObject();
                        res.put("app", new JSONObject(app));

                        collection.add(res);
                    } catch(Exception e) {
                        // do something
                    }
                } while(catalystLocalStorage.moveToNext());
            }
        } finally {
            if (catalystLocalStorage != null) {
                catalystLocalStorage.close();
            }

            if (readableDatabase != null) {
                readableDatabase.close();
            }

            data = this.collection.get(0);
        }
    }

    public String getTheme () {
        try {
            return app.getString("theme");
        } catch (Exception e) {
            return "";
        }
    }
}
