package io.raindrop.raindropio.Extension;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;
import android.util.Patterns;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class Utils {
    /**
     * Extract urls from string.
     * @param input
     * @return
     */
    public static String extractUrl(String input)
    {
        List<String> result = new ArrayList<String>();

        String[] words = input.split("\\s+");


        Pattern pattern = Patterns.WEB_URL;
        for(String word : words)
        {
            if(pattern.matcher(word).find())
            {
                if(!word.toLowerCase().contains("http://") && !word.toLowerCase().contains("https://"))
                {
                    word = "http://" + word;
                }
                result.add(word);
            }
        }

        if (result.isEmpty())
            return "";

        return result.get(0);
    }

    public static WritableMap getFileFromUri(Uri uri, Context context){
        ContentResolver cr = context.getContentResolver();
        Cursor returnCursor = cr.query(uri, null, null, null, null);
        int nameIndex = returnCursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
        returnCursor.moveToFirst();

        WritableMap file = Arguments.createMap();
        file.putString("uri", uri.toString());
        file.putString("type", cr.getType(uri));
        file.putString("name", returnCursor.getString(nameIndex));

        return file;
    }
}
