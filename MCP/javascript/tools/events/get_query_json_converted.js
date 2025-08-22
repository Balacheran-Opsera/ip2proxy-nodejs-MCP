/**
 * Geographic API
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

function getConfig() {
  const baseURL = process.env.API_BASE_URL;
  const bearerToken = process.env.API_BEARER_TOKEN;
  
  if (!baseURL || !bearerToken) {
    const configPath = path.join(os.homedir(), '.api', 'config.json');
    try {
      const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return {
        baseURL: baseURL || configData.baseURL,
        bearerToken: bearerToken || configData.bearerToken
      };
    } catch (e) {
      throw new Error('Configuration not found. Please set API_BASE_URL and API_BEARER_TOKEN environment variables or create config file at ~/.api/config.json');
    }
  }
  
  return { baseURL, bearerToken };
}

export async function get_query_json(name, latitude, longitude, sw, query, filter, date_range, sort, elevation, facets, limit, offset) {
  try {
    const config = getConfig();
    const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (latitude) params.append("latitude", latitude);
      if (longitude) params.append("longitude", longitude);
      if (sw) params.append("sw", sw);
      if (query) params.append("query", query);
      if (filter) params.append("filter", filter);
      if (date_range) params.append("date_range", date_range);
      if (sort) params.append("sort", sort);
      if (elevation) params.append("elevation", elevation);
      if (facets) params.append("facets", facets);
      if (limit) params.append("limit", limit);
      if (offset) params.append("offset", offset);
    const queryString = params.toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    
    const url = `${config.baseURL}/api/unknown`;
    
    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      return `Failed to format JSON: ${response.status} ${response.statusText}`;
    }
    
    try {
      const result = await response.json();
      return JSON.stringify(result, null, 2);
    } catch (e) {
      return await response.text();
    }
    
  } catch (error) {
    return `Request failed: ${error.message}`;
  }
}

export function createGetQueryJsonTool() {
  return {
    definition: {
      name: 'get-query-json',
      description: 'Geographic API',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'A displayable name for the specified place.'
          },
          latitude: {
            type: 'string',
            description: 'The latitude of the specified place.'
          },
          longitude: {
            type: 'string',
            description: 'The longitude of the specified place.'
          },
          sw: {
            type: 'string',
            description: 'Along with ne, forms a bounded box using the longitude and latitude coordinates specified as the southwest corner. The search results are limited to the resulting box. Two float values, separated by a comma `latitude,longitude` <br/> The ne parameter is required to use this parameter.'
          },
          query: {
            type: 'string',
            description: 'Search keywords to perform a text search on the fields: web_description, event_name and venue_name. 'AND' searches can be performed by wrapping query terms in quotes. If you do not specify a query, all results will be returned.'
          },
          filter: {
            type: 'string',
            description: 'Filters search results based on the facets provided. For more information on the values you can filter on, see Facets.'
          },
          date_range: {
            type: 'string',
            description: 'Start date to end date in the following format- YYYY-MM-DD:YYYY-MM-DD'
          },
          sort: {
            type: 'string',
            description: 'Sorts your results on the fields specified. <br/> `sort_value1+[asc | desc],sort_value2+[asc|desc],[...]`<br/> Appending +asc to a facet or response will sort results on that value in ascending order. Appending +desc to a facet or response will sort results in descending order. You can sort on multiple fields. You can sort on any facet. For the list of responses you can sort on, see the Sortable Field column in the Response table. <br/><br/>If you are doing a spatial search with the ll parameter, you can also sort by the distance from the center of the search: dist+[asc | desc] <br/> **Note:** either +asc or +desc is required when using the sort parameter.'
          },
          elevation: {
            type: 'number',
            description: 'The elevation of the specified place, in meters.'
          },
          facets: {
            type: 'number',
            description: 'When facets is set to 1, a count of all facets will be included in the response.'
          },
          limit: {
            type: 'number',
            description: 'Limits the number of results returned'
          },
          offset: {
            type: 'number',
            description: 'Sets the starting point of the result set'
          }
        },
        required: []
      }
    },
    handler: get_query_json
  };
}