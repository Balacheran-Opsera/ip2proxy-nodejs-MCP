package models

import (
	"context"
	"github.com/mark3labs/mcp-go/mcp"
)

type Tool struct {
	Definition mcp.Tool
	Handler    func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error)
}

// Event represents the Event schema from the OpenAPI specification
type Event struct {
	Long_running_show bool `json:"long_running_show,omitempty"`
	State string `json:"state,omitempty"`
	City string `json:"city,omitempty"`
	Event_detail_url string `json:"event_detail_url,omitempty"`
	Web_description string `json:"web_description,omitempty"`
	Festival bool `json:"festival,omitempty"`
	Times_pick bool `json:"times_pick,omitempty"`
	Event_id int `json:"event_id,omitempty"`
	Recurring_start_date string `json:"recurring_start_date,omitempty"`
	Event_schedule_id int `json:"event_schedule_id,omitempty"`
	Last_chance bool `json:"last_chance,omitempty"`
	Last_modified string `json:"last_modified,omitempty"`
	Kid_friendly bool `json:"kid_friendly,omitempty"`
	Event_name string `json:"event_name,omitempty"`
	Free bool `json:"free,omitempty"`
	Previews_and_openings bool `json:"previews_and_openings,omitempty"`
	Recur_days []string `json:"recur_days,omitempty"`
	Critic_name string `json:"critic_name,omitempty"`
	Film_rating bool `json:"film_rating,omitempty"`
}
